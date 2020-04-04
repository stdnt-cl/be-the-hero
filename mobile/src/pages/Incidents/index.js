import React, { useEffect, useState } from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native';

import logoImg from '../../assets/logo.png';
import styles from './styles';
import api from '../../services/api';

export default function Incidents() {
	const [ incidents, setIncidents ] = useState([]);
	const [ total, setTotal ] = useState(0);
	const [ page, setPage ] = useState(1);
	const [ loading, setLoading ] = useState(false);

	const navigation = useNavigation(); // similar to useHistory() in web version


	function navigateToDetail(incident) {
		navigation.navigate('Detail', { incident });
	}

	async function loadIncidents() {
		if (loading) {
			return;
		}
		if (total > 0 && incident.length === total) {
			return;
		}
		setLoading(true);

		const response = await api.get('incidents', {
			params: { page }
		});

		setIncidents([ ...incidents, ...response.data ]);
		setTotal(response.headers['x-total-count']);//it is received in lowercase!!!
		setPage(page + 1)
		setLoading(false);
		console.log(response.headers);
	}

	useEffect(() => {
		loadIncidents();
	})
	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
				<Text style={styles.headerText}>
					Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
				</Text>
			</View>
			<Text style={styles.title}>Bem-vindo!</Text>
			<Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

			<FlatList 
				style={styles.incidentsList} 
				data={incidents}
				keyExtractor={incident => String(incident.id)}
				showsVerticalScrollIndicator={false}
				onEndReached={loadIncidents} //launchs a callback when scroll end is reached
				onEndReachedThreshold={0.2} //when users reachs 20% of the final of this flatlists, load onEndReached callback
				renderItem={({ item: incident})=> (//renderItem brings an standard obj prop called item, renaming to incident 4 semantics
					<View style={styles.incident}>
						<Text style={styles.incidentProperty}>ONG:</Text>
						<Text style={styles.incidentValue}>{incident.name}</Text>

						<Text style={styles.incidentProperty}>CASO:</Text>
						<Text style={styles.incidentValue}>{incident.title}</Text>

						<Text style={styles.incidentProperty}>VALOR:</Text>
						<Text style={styles.incidentValue}>
							{Intl.NumberFormat('pt-BR', {
								style: 'currency',
								currency: 'BRL'
							}).format(incident.value)}
						</Text>
							
						<TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
							<Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
							<Feather name="arrow-right" size={16} color="#E02041" />
						</TouchableOpacity>
					</View>
				)}
			/>

		</View>
	)
}