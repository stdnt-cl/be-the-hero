import React from 'react';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import logoImg from '../../assets/logo.png'
import styles from './styles';


export default function Detail() {
	const navigation = useNavigation();

	function goBack(incident) {
		console.log(incident);
		navigation.navigate('Incidents');
	}

	function sendEmail() {
		//stopped here
	}

	function sendWhatsapp() {
		//stopped here
	}

	return (
		<View style={styles.container}>
			<View style={styles.header}>
				<Image source={logoImg} />
					<TouchableOpacity onPress={goBack}>
						<Feather name="arrow-left" size={28} color="#E82041" />
					</TouchableOpacity>
			</View>

			<View style={style.incident}>
				<Text style={[styles.incidentProperty, { marginTop: 0 }]}>ONG:</Text>
				<Text style={styles.incidentValue}></Text>

				<Text style={styles.incidentProperty}>CASO:</Text>
				<Text style={styles.incidentValue}></Text>

				<Text style={styles.incidentProperty}>VALOR:</Text>
				<Text style={styles.incidentValue}>R$ 120,00</Text>
			</View>

			<View style={styles.contactBox}>
				<Text style={styles.heroTitle}>Salve o dia!</Text>
				<Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
				
				<Text style={styles.heroDescription}>Entre em contato:</Text>

				<View style={styles.actions}>
					<TouchableOpacity style={style.actionButton} onPress={()=>{}}>
						<Text style={style.actionText}>WhatsApp</Text>
					</TouchableOpacity>
					<TouchableOpacity style={style.actionButton} onPress={()=>{}}>
						<Text style={style.actionText}>E-mail</Text>
					</TouchableOpacity>
				</View>

			</View>
		</View>
	)
}