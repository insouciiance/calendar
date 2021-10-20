import {
    ORDINARY_COLOR,
    COMPELLING_COLOR,
    IMPORTANT_COLOR,
    UPPER_PANEL_SCROLL_SPEED,
    BOTTOM_PANEL_SCROLL_SPEED,
    BOTTOM_PANEL_SCROLL_DISTANCE,
    FONT_FAMILY,
} from '../js/customizationTypes';

import {
    ORDINARY_COLOR_DEFAULT,
    COMPELLING_COLOR_DEFAULT,
    IMPORTANT_COLOR_DEFAULT,
    UPPER_PANEL_SCROLL_SPEED_DEFAULT,
    BOTTOM_PANEL_SCROLL_SPEED_DEFAULT,
    BOTTOM_PANEL_SCROLL_DISTANCE_DEFAULT,
    FONT_FAMILY_DEFAULT,
} from '../js/customizationDefaults';

const customizations = {
    getCustomizations: () => ({
        ordinaryColor:
            localStorage.getItem(ORDINARY_COLOR) || ORDINARY_COLOR_DEFAULT,
        compellingColor:
            localStorage.getItem(COMPELLING_COLOR) || COMPELLING_COLOR_DEFAULT,
        importantColor:
            localStorage.getItem(IMPORTANT_COLOR) || IMPORTANT_COLOR_DEFAULT,
        upperPanelScrollSpeed:
            +localStorage.getItem(UPPER_PANEL_SCROLL_SPEED) ||
            UPPER_PANEL_SCROLL_SPEED_DEFAULT,
        bottomPanelScrollSpeed:
            +localStorage.getItem(BOTTOM_PANEL_SCROLL_SPEED) ||
            BOTTOM_PANEL_SCROLL_SPEED_DEFAULT,
        bottomPanelScrollDistance:
            +localStorage.getItem(BOTTOM_PANEL_SCROLL_DISTANCE) ||
            BOTTOM_PANEL_SCROLL_DISTANCE_DEFAULT,
        fontFamily: localStorage.getItem(FONT_FAMILY) || FONT_FAMILY_DEFAULT,
    }),

    checkCustomizations: () => {
        if (!localStorage.getItem(ORDINARY_COLOR)) {
            localStorage.setItem(ORDINARY_COLOR, ORDINARY_COLOR_DEFAULT);
        }

        if (!localStorage.getItem(COMPELLING_COLOR)) {
            localStorage.setItem(COMPELLING_COLOR, COMPELLING_COLOR_DEFAULT);
        }

        if (!localStorage.getItem(IMPORTANT_COLOR)) {
            localStorage.setItem(IMPORTANT_COLOR, IMPORTANT_COLOR_DEFAULT);
        }

        if (!localStorage.getItem(UPPER_PANEL_SCROLL_SPEED)) {
            localStorage.setItem(
                UPPER_PANEL_SCROLL_SPEED,
                UPPER_PANEL_SCROLL_SPEED_DEFAULT,
            );
        }

        if (!localStorage.getItem(BOTTOM_PANEL_SCROLL_SPEED)) {
            localStorage.setItem(
                BOTTOM_PANEL_SCROLL_SPEED,
                BOTTOM_PANEL_SCROLL_SPEED_DEFAULT,
            );
        }

        if (!localStorage.getItem(BOTTOM_PANEL_SCROLL_DISTANCE)) {
            localStorage.setItem(
                BOTTOM_PANEL_SCROLL_DISTANCE,
                BOTTOM_PANEL_SCROLL_DISTANCE_DEFAULT,
            );
        }

        if (!localStorage.getItem(FONT_FAMILY)) {
            localStorage.setItem(FONT_FAMILY, FONT_FAMILY_DEFAULT);
        }
    },

    restoreDefaultCustomizations: () => {
        localStorage.setItem(ORDINARY_COLOR, ORDINARY_COLOR_DEFAULT);
        localStorage.setItem(COMPELLING_COLOR, COMPELLING_COLOR_DEFAULT);
        localStorage.setItem(IMPORTANT_COLOR, IMPORTANT_COLOR_DEFAULT);
        localStorage.setItem(
            UPPER_PANEL_SCROLL_SPEED,
            UPPER_PANEL_SCROLL_SPEED_DEFAULT,
        );
        localStorage.setItem(
            BOTTOM_PANEL_SCROLL_SPEED,
            BOTTOM_PANEL_SCROLL_SPEED_DEFAULT,
        );
        localStorage.setItem(
            BOTTOM_PANEL_SCROLL_DISTANCE,
            BOTTOM_PANEL_SCROLL_DISTANCE_DEFAULT,
        );
        localStorage.setItem(FONT_FAMILY, FONT_FAMILY_DEFAULT);
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
    },
};

export default customizations;
