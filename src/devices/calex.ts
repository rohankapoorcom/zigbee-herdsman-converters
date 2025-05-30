import * as fz from "../converters/fromZigbee";
import * as exposes from "../lib/exposes";
import * as m from "../lib/modernExtend";
import type {DefinitionWithExtend} from "../lib/types";

const e = exposes.presets;

export const definitions: DefinitionWithExtend[] = [
    {
        zigbeeModel: ["EC-Z3.0-CCT"],
        model: "421786",
        vendor: "Calex",
        description: "LED A60 Zigbee GLS-lamp",
        extend: [m.light()],
    },
    {
        zigbeeModel: ["EC-Z3.0-RGBW"],
        model: "421792",
        vendor: "Calex",
        description: "LED A60 Zigbee RGB lamp",
        extend: [m.light({colorTemp: {range: [153, 370]}, color: {modes: ["xy", "hs"]}})],
    },
    {
        zigbeeModel: ["Smart Wall Switch "], // Yes, it has a space at the end :(
        model: "421782",
        vendor: "Calex",
        description: "Smart Wall Switch, wall mounted RGB controller",
        toZigbee: [],
        fromZigbee: [
            fz.command_off,
            fz.command_on,
            fz.command_step,
            fz.command_move_to_color_temp,
            fz.command_move,
            fz.command_stop,
            fz.command_enhanced_move_to_hue_and_saturation,
        ],
        exposes: [
            e.action([
                "on",
                "off",
                "color_temperature_move",
                "brightness_step_up",
                "brightness_step_down",
                "brightness_move_up",
                "brightness_move_down",
                "brightness_stop",
                "enhanced_move_to_hue_and_saturation",
            ]),
        ],
        meta: {disableActionGroup: true},
    },
];
