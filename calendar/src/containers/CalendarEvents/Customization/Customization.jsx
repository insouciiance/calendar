import React, { Component } from 'react';
import { SketchPicker } from 'react-color';
import axios from 'axios';
import { connect } from 'react-redux';

import classes from './Customization.scss';
import customizations from '../../../js/customizations';
import Spinner from '../../../components/Spinner/Spinner';
import * as actions from '../../../store/actions/index';
import TutorialBackdrop from '../../../components/TutorialBackdrop/TutorialBackdrop';

class Customization extends Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedCustomization: null,
			presetSaving: false,
			presetName: '',
			customizationsOpen: false
		};

		this.currentActiveButton = null;
	}

	restoreDefaults = () => {
		customizations.restoreDefaultCustomizations();

		this.props.setStateCustomizations(customizations.getCustomizations());
	};

	customizatonTypeButtonClicked = (event, customizationName) => {
		if (this.state.selectedCustomization !== customizationName) {
			this.setState({
				selectedCustomization: customizationName
			});

			if (this.currentActiveButton !== null) {
				this.currentActiveButton.classList.remove(classes.active);
			}
			event.target.classList.add(classes.active);
			this.currentActiveButton = event.target;

			if (customizationName === 'presets' && this.props.presetsList.length === 0) {
				this.props.loadPresets();
			}
		} else {
			this.setState({ selectedCustomization: null });
			event.target.classList.remove(classes.active);
			this.currentActiveButton = null;
		}
	};

	savePreset = event => {
		event.preventDefault();
		if (this.state.presetName !== '') {
			this.setState({ presetSaving: true });
			const customizationsList = customizations.getCustomizations();
			axios
				.post('https://localhost:44330/api/presets', {
					...customizationsList,
					presetName: this.state.presetName
				})
				.then(() => {
					this.setState({ presetSaving: false, presetName: '' });
					this.props.loadPresets();
				});
		}
	};

	render() {
		const {
			setStateCustomizations,
			deletePreset,
			presetsList,
			presetsLoading,
			tutorialIndex
		} = this.props;

		const {
			ordinaryColor,
			compellingColor,
			importantColor,
			upperPanelScrollSpeed,
			bottomPanelScrollSpeed,
			bottomPanelScrollDistance,
			fontFamily
		} = this.props.customization;

		const { selectedCustomization, presetSaving, presetName, customizationsOpen } = this.state;

		const backdrop =
			tutorialIndex === 5 ? (
				<TutorialBackdrop
					nextTutorialIndex={6}
					auxBdStyle={{ fontSize: '12px' }}
					scrollToTop
				>
					<p>Settings button helps to change the look of the site</p>
				</TutorialBackdrop>
			) : null;

		return (
			<div className={classes.CustomizationsOuter}>
				<div className={classes.ButtonWrapper}>
					{backdrop}
					<button
						onClick={() => {
							if (customizationsOpen && this.currentActiveButton) {
								this.currentActiveButton.classList.remove(classes.active);
							}
							this.setState({
								customizationsOpen: !customizationsOpen,
								selectedCustomization: null
							});
						}}
					>
						<i className='fas fa-cog' />
						SETTINGS
					</button>
				</div>
				<div
					className={classes.CustomizationsWrapper}
					style={{
						display: customizationsOpen ? 'block' : 'none'
					}}
				>
					<div className={classes.SettingsBar}>
						<ul className={classes.SettingsList}>
							<li>
								<button
									onClick={event => {
										this.customizatonTypeButtonClicked(event, 'colors');
									}}
								>
									COLORS
								</button>
							</li>
							<li>
								<button
									onClick={event => {
										this.customizatonTypeButtonClicked(event, 'fonts');
									}}
								>
									FONTS
								</button>
							</li>
							<li>
								<button
									onClick={event => {
										this.customizatonTypeButtonClicked(event, 'animations');
									}}
								>
									ANIMATIONS
								</button>
							</li>
							<li>
								<button
									onClick={event => {
										this.customizatonTypeButtonClicked(event, 'presets');
									}}
								>
									SAVED PRESETS
								</button>
							</li>
						</ul>
					</div>
					<div className={classes.Customizations}>
						<div
							className={classes.Colors}
							style={{
								display: selectedCustomization === 'colors' ? 'flex' : 'none'
							}}
						>
							<div className={classes.ColorCustomization}>
								<div className={classes.ColorCustomizationDescription}>
									<span>Ordinary event color</span>
								</div>
								<div className={classes.ColorCustomizationPicker}>
									<SketchPicker
										color={ordinaryColor}
										onChangeComplete={color => {
											customizations.setCustomizations({
												ordinaryColor: color.hex
											});
											setStateCustomizations({ ordinaryColor: color.hex });
										}}
									/>
								</div>
							</div>
							<div className={classes.ColorCustomization}>
								<div className={classes.ColorCustomizationDescription}>
									<span>Compelling event color</span>
								</div>
								<div className={classes.ColorCustomizationPicker}>
									<SketchPicker
										color={compellingColor}
										onChangeComplete={color => {
											customizations.setCustomizations({
												compellingColor: color.hex
											});
											setStateCustomizations({ compellingColor: color.hex });
										}}
									/>
								</div>
							</div>
							<div className={classes.ColorCustomization}>
								<div className={classes.ColorCustomizationDescription}>
									<span>Important event color</span>
								</div>
								<div className={classes.ColorCustomizationPicker}>
									<SketchPicker
										color={importantColor}
										onChangeComplete={color => {
											customizations.setCustomizations({
												importantColor: color.hex
											});
											setStateCustomizations({ importantColor: color.hex });
										}}
									/>
								</div>
							</div>
						</div>
						<div
							className={classes.Fonts}
							style={{
								display: selectedCustomization === 'fonts' ? 'flex' : 'none'
							}}
						>
							<div className={classes.FontOption}>
								<label htmlFor='fontSelector'>Font style</label>
								<select
									onChange={event => {
										customizations.setCustomizations({
											fontFamily: event.target.value
										});
										setStateCustomizations({ fontFamily: event.target.value });
									}}
									name='fontSelector'
									id='fontSelector'
									value={fontFamily}
								>
									<option value='sans-serif'>Sans-Serif</option>
									<option value='serif'>Serif</option>
									<option value='cursive'>Cursive</option>
									<option value='monospace'>Monospace</option>
									<option value='fantasy'>Fantasy</option>
								</select>
							</div>
						</div>
						<div
							className={classes.Animations}
							style={{
								display: selectedCustomization === 'animations' ? 'flex' : 'none'
							}}
						>
							<div className={classes.FieldInfo}>
								<label htmlFor='upperPanelScrollSpeed'>
									Upper Panel Scroll Speed, ms
								</label>
								<input
									onChange={event => {
										const reg = /^\d+$/;
										const val = event.target.value;
										if (val.match(reg) || val === '') {
											customizations.setCustomizations({
												upperPanelScrollSpeed: +val
											});
											setStateCustomizations({ upperPanelScrollSpeed: +val });
										}
									}}
									value={upperPanelScrollSpeed}
									type='text'
									id='upperPanelScrollSpeed'
								/>
							</div>
							<div className={classes.FieldInfo}>
								<label htmlFor='bottomPanelScrollSpeed'>
									Bottom Panel Scroll Speed, ms
								</label>
								<input
									onChange={event => {
										const reg = /^\d+$/;
										const val = event.target.value;
										if (val.match(reg) || val === '') {
											customizations.setCustomizations({
												bottomPanelScrollSpeed: +val
											});
											setStateCustomizations({
												bottomPanelScrollSpeed: +val
											});
										}
									}}
									value={bottomPanelScrollSpeed}
									type='text'
									id='bottomPanelScrollSpeed'
								/>
							</div>
							<div className={classes.FieldInfo}>
								<label htmlFor='bottomPanelScrollDistance'>
									Bottom Panel Scroll Distance, px
								</label>
								<input
									onChange={event => {
										const reg = /^\d+$/;
										const val = event.target.value;
										if (val.match(reg) || val === '') {
											customizations.setCustomizations({
												bottomPanelScrollDistance: +val
											});
											setStateCustomizations({
												bottomPanelScrollDistance: +val
											});
										}
									}}
									value={bottomPanelScrollDistance}
									type='text'
									id='bottomPanelScrollDistance'
								/>
							</div>
						</div>
						<div
							className={classes.Presets}
							style={{
								display: selectedCustomization === 'presets' ? 'block' : 'none'
							}}
						>
							{presetsLoading ? (
								<Spinner />
							) : (
								presetsList.map(x => (
									<div key={x.id} className={classes.PresetWrapper}>
										<button
											className={classes.PresetButton}
											onClick={() => {
												const c = {
													ordinaryColor: x.ordinaryColor,
													compellingColor: x.compellingColor,
													importantColor: x.importantColor,
													upperPanelScrollSpeed: x.upperPanelScrollSpeed,
													bottomPanelScrollSpeed:
														x.bottomPanelScrollSpeed,
													bottomPanelScrollDistance:
														x.bottomPanelScrollDistance,
													fontFamily: x.fontFamily
												};
												customizations.setCustomizations(c);
												setStateCustomizations(c);
											}}
											style={{
												backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), 
										linear-gradient(to right, ${x.ordinaryColor}, ${x.compellingColor}, ${x.importantColor})`
											}}
										>
											{x.presetName}
										</button>
										<button
											className={classes.DeleteButton}
											onClick={() => {
												deletePreset(x.id);
											}}
										>
											Delete
										</button>
									</div>
								))
							)}
						</div>
					</div>
					<div className={classes.SavePresetWrapper}>
						{presetSaving ? (
							<Spinner />
						) : (
							<form
								className={classes.SavePresetForm}
								action='POST'
								onSubmit={event => {
									this.savePreset(event);
								}}
							>
								<input
									type='text'
									id='presetname'
									value={presetName}
									onChange={event => {
										const inputName = event.target.value;
										if (inputName.length <= 20) {
											this.setState({ presetName: event.target.value });
										}
									}}
									placeholder='Preset Name'
								/>
								<button className={classes.SaveButton}>SAVE CURRENT PRESET</button>
							</form>
						)}
					</div>
					<button onClick={this.restoreDefaults}>RESTORE DEFAULTS</button>
				</div>
			</div>
		);
	}
}

const mapStateToProps = state => {
	return {
		customization: state.customizations.customization,
		presetsList: state.customizations.presetsList,
		presetsLoading: state.customizations.presetsLoading,
		tutorialIndex: state.tutorial
	};
};

const mapDispatchToProps = dispatch => {
	return {
		setStateCustomizations: customization => dispatch(actions.setCustomizations(customization)),
		deletePreset: presetId => dispatch(actions.deletePresetThunk(presetId)),
		loadPresets: () => dispatch(actions.loadPresetsThunk())
	};
};

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(Customization);
