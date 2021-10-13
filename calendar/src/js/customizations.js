const customizations = {
	getCustomizations: () => {
		const localStorageCustomizations = {
			ordinaryColor: localStorage.getItem('ordinaryColor') || 'green',
			compellingColor: localStorage.getItem('compellingColor') || 'orange',
			importantColor: localStorage.getItem('importantColor') || 'red',
			upperPanelScrollSpeed: +localStorage.getItem('upperPanelScrollSpeed') || 300,
			bottomPanelScrollSpeed: +localStorage.getItem('bottomPanelScrollSpeed') || 150,
			bottomPanelScrollDistance: +localStorage.getItem('bottomPanelScrollDistance') || 300,
			fontFamily: localStorage.getItem('fontFamily') || 'sans-serif'
		};

		return localStorageCustomizations;
	},

	checkCustomizations: () => {
		if (localStorage.getItem('ordinaryColor') === null) {
			localStorage.setItem('ordinaryColor', 'green');
		}

		if (localStorage.getItem('compellingColor') === null) {
			localStorage.setItem('compellingColor', 'orange');
		}

		if (localStorage.getItem('importantColor') === null) {
			localStorage.setItem('importantColor', 'red');
		}

		if (localStorage.getItem('upperPanelScrollSpeed') === null) {
			localStorage.setItem('upperPanelScrollSpeed', '300');
		}

		if (localStorage.getItem('bottomPanelScrollSpeed') === null) {
			localStorage.setItem('bottomPanelScrollSpeed', '150');
		}

		if (localStorage.getItem('bottomPanelScrollDistance') === null) {
			localStorage.setItem('bottomPanelScrollDistance', '300');
		}

		if (localStorage.getItem('fontFamily') === null) {
			localStorage.setItem('fontFamily', 'sans-serif');
		}
	},

	restoreDefaultCustomizations: () => {
		localStorage.setItem('ordinaryColor', 'green');
		localStorage.setItem('compellingColor', 'orange');
		localStorage.setItem('importantColor', 'red');
		localStorage.setItem('upperPanelScrollSpeed', '300');
		localStorage.setItem('bottomPanelScrollSpeed', '150');
		localStorage.setItem('bottomPanelScrollDistance', '300');
		localStorage.setItem('fontFamily', 'sans-serif');
	},

	setCustomization: (name, value) => {
		localStorage.setItem(name, value);
	},

	setCustomizations: customizationsList => {
		if (customizationsList) {
			Object.keys(customizationsList).forEach(key => {
				localStorage.setItem(key, customizationsList[key]);
			});
		}
	}
};

export default customizations;
