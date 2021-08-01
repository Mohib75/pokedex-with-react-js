import { Button, CircularProgress, Typography, Link } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { toFirstCharUppercase } from "./constants";
import axios from "axios";

const Pokemon = (props) => {
	const { history, match } = props;
	const { params } = match;
	const { pokemonId } = params;
	const [pokemon, setPokemon] = useState(undefined);

	useEffect(() => {
		axios
			.get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
			.then(function (response) {
				const { data } = response;
				setPokemon(data);
			})
			.catch(function (error) {
				setPokemon(false);
			});
	}, [pokemonId]);

	const generatePokemonJSX = () => {
		const { name, id, species, height, weight, types, sprites } = pokemon;
		const fullImageUrl = `https://img.pokemondb.net/artwork/${name}.jpg`;
		const { front_default } = sprites;

		return (
			<>
				<Typography variant='h1'>
					{`${id}.`} {toFirstCharUppercase(name)}
					<img src={front_default} alt='' />
				</Typography>
				<img style={{ width: "300px", height: "300px" }} src={fullImageUrl} alt='' />
				<Typography variant='h3'>Pokemon info</Typography>
				<Typography>
					{"Species: "}
					<Link href={species.url}>{species.name}</Link>
				</Typography>
				<Typography>Height: {height}</Typography>
				<Typography>Weight: {weight}</Typography>
				<Typography variant='h6'>Types: </Typography>
				{types.map((typeInfo) => {
					const { type } = typeInfo;
					const { name } = type;

					return <Typography key={name}> {`${name}`}</Typography>;
				})}
			</>
		);
	};

	return (
		<>
			{Pokemon === undefined && <CircularProgress color='secondary' />}
			{Pokemon !== undefined && pokemon && generatePokemonJSX()}
			{Pokemon === false && <Typography>Pokemon not found</Typography>}
			{Pokemon !== undefined && (
				<Button variant='contained' onClick={() => history.push("/")}>
					Back to Poekdex
				</Button>
			)}
		</>
	);
};

export default Pokemon;
