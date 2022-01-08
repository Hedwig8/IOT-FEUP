import React from "react";
import { StyleSheet, Text, useColorScheme, View } from "react-native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { Collapse, CollapseHeader, CollapseBody } from 'accordion-collapse-react-native';


export const Section: React.FC<{
	title: string;
}> = ({ children, title }) => {
	const isDarkMode = useColorScheme() === 'dark';
	return (
		<View style={styles.sectionContainer}>
			<Collapse>
				<CollapseHeader>
					<Text
						style={[
							styles.sectionTitle,
							{
								color: isDarkMode ? Colors.white : Colors.black,
							},
						]}>
						{title}
					</Text>
				</CollapseHeader>
				<CollapseBody>
					<Text
						style={[
							styles.sectionDescription,
							{
								color: isDarkMode ? Colors.light : Colors.dark,
							},
						]}>
						{children}
					</Text>
				</CollapseBody>
			</Collapse>
		</View>
	);
};

export const styles = StyleSheet.create({
	sectionContainer: {
		marginTop: 32,
		paddingHorizontal: 24,
	},
	sectionTitle: {
		fontSize: 24,
		fontWeight: '600',
	},
	sectionDescription: {
		marginTop: 8,
		fontSize: 18,
		fontWeight: '400',
	},
	highlight: {
		fontWeight: '700',
	},
});