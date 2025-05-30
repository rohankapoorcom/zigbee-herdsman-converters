import * as m from "../lib/modernExtend";
import type {DefinitionWithExtend} from "../lib/types";

export const definitions: DefinitionWithExtend[] = [
    {
        zigbeeModel: ["ZP1-EN"],
        model: "ZP1-EN",
        vendor: "IMOU",
        description: "Zigbee ZP1 PIR motion sensor",
        extend: [m.battery(), m.iasZoneAlarm({zoneType: "occupancy", zoneAttributes: ["alarm_1", "tamper", "battery_low"], alarmTimeout: true})],
    },
    {
        zigbeeModel: ["ZR1-EN"],
        model: "ZR1-EN",
        vendor: "IMOU",
        description: "Zigbee ZR1 siren",
        extend: [
            m.battery(),
            m.forceDeviceType({type: "EndDevice"}),
            m.iasWarning(),
            m.iasZoneAlarm({zoneType: "alarm", zoneAttributes: ["alarm_1", "tamper", "battery_low"]}),
        ],
        meta: {disableDefaultResponse: true},
    },
    {
        zigbeeModel: ["ZD1-EN"],
        model: "ZD1-EN",
        vendor: "IMOU",
        description: "Door & window sensor",
        extend: [m.iasZoneAlarm({zoneType: "alarm", zoneAttributes: ["alarm_1", "tamper", "battery_low"]}), m.battery()],
    },
    {
        zigbeeModel: ["ZGA1-EN"],
        model: "ZGA1-EN",
        vendor: "IMOU",
        description: "Smart gas detector",
        extend: [
            m.forceDeviceType({type: "Router"}),
            m.iasZoneAlarm({zoneType: "gas", zoneAttributes: ["alarm_1", "alarm_2", "tamper", "test"], alarmTimeout: true}),
        ],
    },
    {
        zigbeeModel: ["ZTM1-EN"],
        model: "ZTM1-EN",
        vendor: "IMOU",
        description: "Temperature and humidity sensor",
        extend: [m.battery(), m.temperature(), m.humidity()],
    },
];
