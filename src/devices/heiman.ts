import * as fz from "../converters/fromZigbee";
import * as tz from "../converters/toZigbee";
import * as constants from "../lib/constants";
import * as exposes from "../lib/exposes";
import * as m from "../lib/modernExtend";
import * as reporting from "../lib/reporting";
import * as tuya from "../lib/tuya";
import type {DefinitionWithExtend, Reporting, Zh} from "../lib/types";

const e = exposes.presets;
const ea = exposes.access;

export const definitions: DefinitionWithExtend[] = [
    {
        zigbeeModel: ["PIRILLSensor-EF-3.0"],
        model: "HS1MIS-3.0",
        vendor: "Heiman",
        description: "Smart occupancy sensor",
        fromZigbee: [fz.occupancy, fz.battery],
        exposes: [e.occupancy(), e.battery()],
        configure: async (device, cordinatorEndpoint) => {
            const endpoint1 = device.getEndpoint(1);
            await reporting.bind(endpoint1, cordinatorEndpoint, ["msOccupancySensing", "genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint1);
            await reporting.occupancy(endpoint1);
        },
        extend: [m.illuminance()],
    },
    {
        fingerprint: tuya.fingerprint("TS0212", ["_TYZB01_wpmo3ja3"]),
        zigbeeModel: ["CO_V15", "CO_YDLV10", "CO_V16", "1ccaa94c49a84abaa9e38687913947ba", "CO_CTPG"],
        model: "HS1CA-M",
        description: "Smart carbon monoxide sensor",
        vendor: "Heiman",
        fromZigbee: [fz.ias_carbon_monoxide_alarm_1, fz.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
            await reporting.batteryAlarmState(endpoint);
        },
        exposes: [e.carbon_monoxide(), e.battery_low(), e.battery()],
    },
    {
        zigbeeModel: ["PIRSensor-N", "PIRSensor-EM", "PIRSensor-EF-3.0", "PIR_TPV13"],
        model: "HS3MS",
        vendor: "Heiman",
        description: "Smart motion sensor",
        fromZigbee: [fz.ias_occupancy_alarm_1],
        toZigbee: [],
        exposes: [e.occupancy(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ["SmartPlug", "SmartPlug-EF-3.0"],
        model: "HS2SK",
        description: "Smart metering plug",
        vendor: "Heiman",
        fromZigbee: [fz.on_off, fz.electrical_measurement, fz.metering],
        toZigbee: [tz.on_off],
        whiteLabel: [{vendor: "Schneider Electric", model: "CCTFR6500"}],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genOnOff", "haElectricalMeasurement", "seMetering"]);
            await reporting.onOff(endpoint);
            await reporting.readEletricalMeasurementMultiplierDivisors(endpoint);
            await reporting.rmsVoltage(endpoint);
            await reporting.rmsCurrent(endpoint);
            await reporting.activePower(endpoint);
            await reporting.readMeteringMultiplierDivisor(endpoint);
            await reporting.currentSummDelivered(endpoint);
        },
        exposes: [e.switch(), e.power(), e.current(), e.voltage(), e.energy()],
    },
    {
        fingerprint: [{modelID: "SmartPlug-N", manufacturerName: "HEIMAN"}],
        model: "HS2SK_nxp",
        description: "Smart metering plug",
        vendor: "Heiman",
        fromZigbee: [fz.on_off, fz.electrical_measurement],
        toZigbee: [tz.on_off],
        options: [exposes.options.measurement_poll_interval()],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genOnOff", "haElectricalMeasurement"]);
            await reporting.onOff(endpoint);
            await reporting.readEletricalMeasurementMultiplierDivisors(endpoint);
        },
        onEvent: (type, data, device, settings) => tuya.onEventMeasurementPoll(type, data, device, settings),
        exposes: [e.switch(), e.power(), e.current(), e.voltage()],
    },
    {
        zigbeeModel: [
            "SMOK_V16",
            "SMOK_V15",
            "b5db59bfd81e4f1f95dc57fdbba17931",
            "98293058552c49f38ad0748541ee96ba",
            "SMOK_YDLV10",
            "FB56-SMF02HM1.4",
            "SmokeSensor-N-3.0",
            "319fa36e7384414a9ea62cba8f6e7626",
            "c3442b4ac59b4ba1a83119d938f283ab",
            "SmokeSensor-EF-3.0",
            "SMOK_HV14",
        ],
        model: "HS1SA",
        vendor: "Heiman",
        description: "Smoke detector",
        fromZigbee: [fz.ias_smoke_alarm_1, fz.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
        },
        exposes: [e.smoke(), e.battery_low(), e.battery(), e.test()],
    },
    {
        zigbeeModel: ["SmokeSensor-N", "SmokeSensor-EM"],
        model: "HS3SA/HS1SA",
        vendor: "Heiman",
        description: "Smoke detector",
        fromZigbee: [fz.ias_smoke_alarm_1, fz.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
        },
        exposes: [e.smoke(), e.battery_low(), e.battery(), e.test()],
    },
    {
        zigbeeModel: ["GASSensor-N", "GASSensor-N-3.0", "d90d7c61c44d468a8e906ca0841e0a0c"],
        model: "HS3CG",
        vendor: "Heiman",
        description: "Combustible gas sensor",
        fromZigbee: [fz.ias_gas_alarm_2],
        toZigbee: [],
        exposes: [e.gas(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ["GASSensor-EN"],
        model: "HS1CG-M",
        vendor: "Heiman",
        description: "Combustible gas sensor",
        fromZigbee: [fz.ias_gas_alarm_1],
        toZigbee: [],
        exposes: [e.gas(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ["RH3070"],
        model: "HS1CG",
        vendor: "Heiman",
        description: "Smart combustible gas sensor",
        fromZigbee: [fz.ias_gas_alarm_1],
        toZigbee: [],
        exposes: [e.gas(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ["GAS_V15"],
        model: "HS1CG_M",
        vendor: "Heiman",
        description: "Combustible gas sensor",
        fromZigbee: [fz.ias_gas_alarm_2],
        toZigbee: [],
        exposes: [e.gas(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ["DoorSensor-N", "DoorSensor-N-3.0"],
        model: "HS3DS",
        vendor: "Heiman",
        description: "Door sensor",
        fromZigbee: [fz.ias_contact_alarm_1, fz.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read("genPowerCfg", ["batteryPercentageRemaining"]);
        },
        exposes: [e.contact(), e.battery(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ["DoorSensor-EM", "DoorSensor-EF-3.0"],
        model: "HS1DS",
        vendor: "Heiman",
        description: "Door sensor",
        fromZigbee: [fz.ias_contact_alarm_1, fz.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read("genPowerCfg", ["batteryPercentageRemaining"]);
        },
        exposes: [e.contact(), e.battery_low(), e.tamper(), e.battery()],
    },
    {
        zigbeeModel: ["DOOR_TPV13", "DOOR_TPV12"],
        model: "HEIMAN-M1",
        vendor: "Heiman",
        description: "Door sensor",
        fromZigbee: [fz.ias_contact_alarm_1],
        toZigbee: [],
        exposes: [e.contact(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ["WaterSensor-N", "WaterSensor-EM", "WaterSensor-N-3.0", "WaterSensor-EF-3.0", "WaterSensor2-EF-3.0", "WATER_TPV13"],
        model: "HS1WL/HS3WL",
        vendor: "Heiman",
        description: "Water leakage sensor",
        fromZigbee: [fz.ias_water_leak_alarm_1, fz.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read("genPowerCfg", ["batteryPercentageRemaining"]);
        },
        exposes: [e.water_leak(), e.battery_low(), e.tamper(), e.battery()],
    },
    {
        fingerprint: [{modelID: "RC-N", manufacturerName: "HEIMAN"}],
        model: "HS1RC-N",
        vendor: "Heiman",
        description: "Smart remote controller",
        fromZigbee: [fz.battery, fz.command_arm, fz.command_emergency],
        toZigbee: [],
        exposes: [e.battery(), e.action(["emergency", "disarm", "arm_partial_zones", "arm_all_zones"])],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read("genPowerCfg", ["batteryPercentageRemaining"]);
        },
    },
    {
        fingerprint: [{modelID: "RC-EF-3.0", manufacturerName: "HEIMAN"}],
        model: "HM1RC-2-E",
        vendor: "Heiman",
        description: "Smart remote controller",
        fromZigbee: [fz.battery, fz.command_arm, fz.command_emergency],
        toZigbee: [],
        exposes: [e.battery(), e.action(["emergency", "disarm", "arm_day_zones", "arm_all_zones"])],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read("genPowerCfg", ["batteryPercentageRemaining"]);
        },
        onEvent: async (type, data, device) => {
            // Since arm command has a response zigbee-herdsman doesn't send a default response.
            // This causes the remote to repeat the arm command, so send a default response here.
            if (data.type === "commandArm" && data.cluster === "ssIasAce") {
                await data.endpoint.defaultResponse(0, 0, 1281, data.meta.zclTransactionSequenceNumber);
            }
        },
    },
    {
        fingerprint: [{modelID: "RC-EM", manufacturerName: "HEIMAN"}],
        model: "HS1RC-EM",
        vendor: "Heiman",
        description: "Smart remote controller",
        fromZigbee: [fz.battery, fz.command_arm, fz.command_emergency],
        toZigbee: [],
        exposes: [e.battery(), e.action(["emergency", "disarm", "arm_partial_zones", "arm_all_zones"])],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read("genPowerCfg", ["batteryPercentageRemaining"]);
        },
    },
    {
        zigbeeModel: ["COSensor-EM", "COSensor-N", "COSensor-EF-3.0"],
        model: "HS1CA-E",
        vendor: "Heiman",
        description: "Smart carbon monoxide sensor",
        fromZigbee: [fz.ias_carbon_monoxide_alarm_1, fz.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
        },
        exposes: [e.carbon_monoxide(), e.battery_low(), e.battery()],
    },
    {
        fingerprint: tuya.fingerprint("TS0216", ["_TYZB01_8scntis1", "_TYZB01_4obovpbi"]),
        zigbeeModel: ["WarningDevice", "WarningDevice-EF-3.0"],
        model: "HS2WD-E",
        vendor: "Heiman",
        description: "Smart siren",
        fromZigbee: [fz.battery, fz.ignore_basic_report, fz.ias_wd],
        toZigbee: [tz.warning, tz.ias_max_duration],
        meta: {disableDefaultResponse: true},
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read("ssIasWd", ["maxDuration"]);
        },
        exposes: [
            e.battery(),
            e
                .numeric("max_duration", ea.ALL)
                .withUnit("s")
                .withValueMin(0)
                .withValueMax(600)
                .withDescription("Max duration of Siren")
                .withCategory("config"),
            e
                .warning()
                .removeFeature("level")
                .removeFeature("strobe_level")
                .removeFeature("mode")
                .withFeature(e.enum("mode", ea.SET, ["stop", "emergency"]).withDescription("Mode of the warning (sound effect)")),
        ],
    },
    {
        zigbeeModel: ["HT-EM", "TH-EM", "TH-T_V14"],
        model: "HS1HT",
        vendor: "Heiman",
        description: "Smart temperature & humidity Sensor",
        exposes: [e.battery(), e.temperature(), e.humidity()],
        fromZigbee: [fz.temperature, fz.humidity, fz.battery],
        toZigbee: [],
        meta: {battery: {voltageToPercentage: {min: 2500, max: 3000}}},
        whiteLabel: [{vendor: "Ferguson", model: "TH-T_V14"}],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint1 = device.getEndpoint(1);
            await reporting.bind(endpoint1, coordinatorEndpoint, ["msTemperatureMeasurement"]);
            const endpoint2 = device.getEndpoint(2);
            await reporting.bind(endpoint2, coordinatorEndpoint, ["msRelativeHumidity", "genPowerCfg"]);
            await reporting.temperature(endpoint1);
            await reporting.humidity(endpoint2);
            await reporting.batteryVoltage(endpoint2);
            await reporting.batteryPercentageRemaining(endpoint2);
        },
    },
    {
        zigbeeModel: ["HT-N", "HT-EF-3.0"],
        model: "HS1HT-N",
        vendor: "Heiman",
        description: "Smart temperature & humidity Sensor",
        fromZigbee: [fz.temperature, fz.humidity, fz.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint1 = device.getEndpoint(1);
            await reporting.bind(endpoint1, coordinatorEndpoint, ["msTemperatureMeasurement", "genPowerCfg"]);
            await reporting.temperature(endpoint1);
            await reporting.batteryPercentageRemaining(endpoint1);
            await endpoint1.read("genPowerCfg", ["batteryPercentageRemaining"]);

            const endpoint2 = device.getEndpoint(2);
            await reporting.bind(endpoint2, coordinatorEndpoint, ["msRelativeHumidity"]);
            await reporting.humidity(endpoint2);
        },
        exposes: [e.temperature(), e.humidity(), e.battery()],
    },
    {
        zigbeeModel: ["E_Socket"],
        model: "HS2ESK-E",
        vendor: "Heiman",
        description: "Smart in wall plug",
        fromZigbee: [fz.on_off, fz.electrical_measurement],
        toZigbee: [tz.on_off],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genOnOff", "haElectricalMeasurement"]);
            await reporting.onOff(endpoint);
            await reporting.readEletricalMeasurementMultiplierDivisors(endpoint);
            await reporting.rmsVoltage(endpoint);
            await reporting.rmsCurrent(endpoint);
            await reporting.activePower(endpoint);
        },
        exposes: [e.switch(), e.power(), e.current(), e.voltage()],
    },
    {
        fingerprint: [
            {modelID: "SOS-EM", manufacturerName: "HEIMAN"},
            {modelID: "SOS-EF-3.0", manufacturerName: "HEIMAN"},
        ],
        model: "HS1EB/HS1EB-E",
        vendor: "Heiman",
        description: "Smart emergency button",
        fromZigbee: [fz.command_status_change_notification_action, fz.battery],
        toZigbee: [],
        exposes: [e.battery(), e.action(["off", "single", "double", "hold"])],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read("genPowerCfg", ["batteryPercentageRemaining"]);
        },
    },
    {
        fingerprint: [{modelID: "SceneSwitch-EM-3.0", manufacturerName: "HEIMAN"}],
        model: "HS2SS",
        vendor: "Heiman",
        description: "Smart scene switch",
        fromZigbee: [fz.battery, fz.heiman_scenes],
        exposes: [e.battery(), e.action(["cinema", "at_home", "sleep", "go_out", "repast"])],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg", "heimanSpecificScenes"]);
            await reporting.batteryPercentageRemaining(endpoint);
        },
    },
    {
        zigbeeModel: ["TempDimmerSw-EM-3.0"],
        model: "HS2WDSC-E",
        vendor: "Heiman",
        description: "Remote dimmer and temperature control",
        fromZigbee: [
            fz.battery,
            fz.command_on,
            fz.command_off,
            fz.command_move,
            fz.command_stop,
            fz.command_move_to_color,
            fz.command_move_to_color_temp,
        ],
        exposes: [e.battery(), e.action(["on", "off", "move", "stop", "color_move", "color_temperature_move"])],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg", "genOnOff", "genLevelCtrl", "lightingColorCtrl"]);
            await reporting.batteryPercentageRemaining(endpoint, {min: constants.repInterval.MINUTES_5, max: constants.repInterval.HOUR});
        },
    },
    {
        fingerprint: [{modelID: "ColorDimmerSw-EM-3.0", manufacturerName: "HEIMAN"}],
        model: "HS2WDSR-E",
        vendor: "Heiman",
        description: "Remote dimmer and color control",
        fromZigbee: [fz.battery, fz.command_on, fz.command_off, fz.command_move, fz.command_stop, fz.command_move_to_color],
        exposes: [e.battery(), e.action(["on", "off", "move", "stop", "color_move"])],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg", "genOnOff", "genLevelCtrl", "lightingColorCtrl"]);
            await reporting.batteryPercentageRemaining(endpoint, {min: constants.repInterval.MINUTES_5, max: constants.repInterval.HOUR});
        },
    },
    {
        zigbeeModel: ["HS3HT-EFA-3.0"],
        model: "HS3HT",
        vendor: "Heiman",
        description: "Temperature & humidity sensor with display",
        fromZigbee: [fz.temperature, fz.humidity, fz.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint1 = device.getEndpoint(1);
            await reporting.bind(endpoint1, coordinatorEndpoint, ["msTemperatureMeasurement", "genPowerCfg"]);
            await reporting.temperature(endpoint1);
            await reporting.batteryPercentageRemaining(endpoint1);
            await endpoint1.read("genPowerCfg", ["batteryPercentageRemaining"]);
            const endpoint2 = device.getEndpoint(2);
            await reporting.bind(endpoint2, coordinatorEndpoint, ["msRelativeHumidity"]);
            await reporting.humidity(endpoint2);
        },
        exposes: [e.battery(), e.temperature(), e.humidity()],
    },
    {
        zigbeeModel: ["GASSensor-EM", "358e4e3e03c644709905034dae81433e"],
        model: "HS1CG-E",
        vendor: "Heiman",
        description: "Combustible gas sensor",
        fromZigbee: [fz.ias_gas_alarm_1],
        toZigbee: [],
        whiteLabel: [{vendor: "Piri", model: "HSIO18008"}],
        exposes: [e.gas(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ["GASSensor-EFR-3.0", "GASSensor-EF-3.0"],
        model: "HS1CG-E_3.0",
        vendor: "Heiman",
        description: "Combustible gas sensor",
        fromZigbee: [fz.ias_gas_alarm_2],
        toZigbee: [],
        exposes: [e.gas(), e.battery_low(), e.tamper()],
    },
    {
        fingerprint: [{modelID: "Vibration-N", manufacturerName: "HEIMAN"}],
        model: "HS1VS-N",
        vendor: "Heiman",
        description: "Vibration sensor",
        fromZigbee: [fz.ias_vibration_alarm_1, fz.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read("genPowerCfg", ["batteryPercentageRemaining"]);
        },
        exposes: [e.vibration(), e.battery_low(), e.tamper(), e.battery()],
    },
    {
        fingerprint: [
            {modelID: "Vibration-EF_3.0", manufacturerName: "HEIMAN"},
            {modelID: "Vibration-EF-3.0", manufacturerName: "HEIMAN"},
        ],
        model: "HS1VS-EF",
        vendor: "Heiman",
        description: "Vibration sensor",
        fromZigbee: [fz.ias_vibration_alarm_1, fz.battery],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
            await endpoint.read("genPowerCfg", ["batteryPercentageRemaining"]);
        },
        exposes: [e.vibration(), e.battery_low(), e.tamper(), e.battery()],
    },
    {
        fingerprint: [{modelID: "HS2AQ-EM", manufacturerName: "HEIMAN"}],
        model: "HS2AQ-EM",
        vendor: "Heiman",
        description: "Air quality monitor",
        fromZigbee: [fz.battery, fz.temperature, fz.humidity, fz.pm25, fz.heiman_hcho, fz.heiman_air_quality],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const heiman = {
                configureReporting: {
                    pm25MeasuredValue: async (endpoint: Zh.Endpoint, overrides?: Reporting.Override) => {
                        const payload = reporting.payload("measuredValue", 0, constants.repInterval.HOUR, 1, overrides);
                        await endpoint.configureReporting("pm25Measurement", payload);
                    },
                    formAldehydeMeasuredValue: async (endpoint: Zh.Endpoint, overrides?: Reporting.Override) => {
                        const payload = reporting.payload("measuredValue", 0, constants.repInterval.HOUR, 1, overrides);
                        await endpoint.configureReporting("msFormaldehyde", payload);
                    },
                    batteryState: async (endpoint: Zh.Endpoint, overrides?: Reporting.Override) => {
                        const payload = reporting.payload("batteryState", 0, constants.repInterval.HOUR, 1, overrides);
                        await endpoint.configureReporting("heimanSpecificAirQuality", payload);
                    },
                    pm10measuredValue: async (endpoint: Zh.Endpoint, overrides?: Reporting.Override) => {
                        const payload = reporting.payload("pm10measuredValue", 0, constants.repInterval.HOUR, 1, overrides);
                        await endpoint.configureReporting("heimanSpecificAirQuality", payload);
                    },
                    tvocMeasuredValue: async (endpoint: Zh.Endpoint, overrides?: Reporting.Override) => {
                        const payload = reporting.payload("tvocMeasuredValue", 0, constants.repInterval.HOUR, 1, overrides);
                        await endpoint.configureReporting("heimanSpecificAirQuality", payload);
                    },
                    aqiMeasuredValue: async (endpoint: Zh.Endpoint, overrides?: Reporting.Override) => {
                        const payload = reporting.payload("aqiMeasuredValue", 0, constants.repInterval.HOUR, 1, overrides);
                        await endpoint.configureReporting("heimanSpecificAirQuality", payload);
                    },
                },
            };

            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, [
                "genPowerCfg",
                "genTime",
                "msTemperatureMeasurement",
                "msRelativeHumidity",
                "pm25Measurement",
                "msFormaldehyde",
                "heimanSpecificAirQuality",
            ]);

            await reporting.batteryPercentageRemaining(endpoint);
            await reporting.temperature(endpoint);
            await reporting.humidity(endpoint);

            await heiman.configureReporting.pm25MeasuredValue(endpoint);
            await heiman.configureReporting.formAldehydeMeasuredValue(endpoint);
            await heiman.configureReporting.batteryState(endpoint);
            await heiman.configureReporting.pm10measuredValue(endpoint);
            await heiman.configureReporting.tvocMeasuredValue(endpoint);
            await heiman.configureReporting.aqiMeasuredValue(endpoint);

            await endpoint.read("genPowerCfg", ["batteryPercentageRemaining"]);

            // Seems that it is bug in HEIMAN, device does not asks for the time with binding
            // So, we need to write time during configure
            const time = Math.round((new Date().getTime() - constants.OneJanuary2000) / 1000);
            // Time-master + synchronised
            const values = {timeStatus: 3, time: time, timeZone: new Date().getTimezoneOffset() * -1 * 60};
            await endpoint.write("genTime", values);
        },
        exposes: [
            e.battery(),
            e.temperature(),
            e.humidity(),
            e.pm25(),
            e.hcho(),
            e.voc(),
            e.aqi(),
            e.pm10(),
            e.enum("battery_state", ea.STATE, ["not_charging", "charging", "charged"]),
        ],
    },
    {
        fingerprint: [{modelID: "IRControl-EM", manufacturerName: "HEIMAN"}],
        model: "HS2IRC",
        vendor: "Heiman",
        description: "Smart IR Control",
        fromZigbee: [fz.battery, fz.heiman_ir_remote],
        toZigbee: [tz.heiman_ir_remote],
        exposes: [e.battery()],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg", "heimanSpecificInfraRedRemote"]);
            await reporting.batteryPercentageRemaining(endpoint);
        },
    },
    {
        zigbeeModel: ["HS2SW1L-EF-3.0", "HS2SW1L-EFR-3.0", "HS2SW1A-N"],
        fingerprint: [
            {modelID: "HS2SW1A-EF-3.0", manufacturerName: "HEIMAN"},
            {modelID: "HS2SW1A-EFR-3.0", manufacturerName: "HEIMAN"},
        ],
        model: "HS2SW1A/HS2SW1A-N",
        vendor: "Heiman",
        description: "Smart switch - 1 gang with neutral wire",
        fromZigbee: [fz.ignore_basic_report, fz.on_off, fz.device_temperature],
        toZigbee: [tz.on_off],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genOnOff", "genDeviceTempCfg"]);
            await reporting.onOff(endpoint);
            await reporting.deviceTemperature(endpoint);
        },
        exposes: [e.switch(), e.device_temperature()],
    },
    {
        zigbeeModel: ["HS2SW2L-EF-3.0", "HS2SW2L-EFR-3.0", "HS2SW2A-N"],
        fingerprint: [
            {modelID: "HS2SW2A-EF-3.0", manufacturerName: "HEIMAN"},
            {modelID: "HS2SW2A-EFR-3.0", manufacturerName: "HEIMAN"},
        ],
        model: "HS2SW2A/HS2SW2A-N",
        vendor: "Heiman",
        description: "Smart switch - 2 gang with neutral wire",
        fromZigbee: [fz.ignore_basic_report, fz.on_off, fz.device_temperature],
        toZigbee: [tz.on_off],
        endpoint: (device) => {
            return {left: 1, right: 2};
        },
        meta: {multiEndpoint: true},
        configure: async (device, coordinatorEndpoint) => {
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ["genOnOff", "genDeviceTempCfg"]);
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ["genOnOff"]);
            await reporting.deviceTemperature(device.getEndpoint(1));
        },
        exposes: [e.switch().withEndpoint("left"), e.switch().withEndpoint("right"), e.device_temperature()],
    },
    {
        zigbeeModel: ["HS2SW3L-EF-3.0", "HS2SW3L-EFR-3.0", "HS2SW3A-N"],
        fingerprint: [
            {modelID: "HS2SW3A-EF-3.0", manufacturerName: "HEIMAN"},
            {modelID: "HS2SW3A-EFR-3.0", manufacturerName: "HEIMAN"},
        ],
        model: "HS2SW3A/HS2SW3A-N",
        vendor: "Heiman",
        description: "Smart switch - 3 gang with neutral wire",
        fromZigbee: [fz.ignore_basic_report, fz.on_off, fz.device_temperature],
        toZigbee: [tz.on_off],
        endpoint: (device) => {
            return {left: 1, center: 2, right: 3};
        },
        meta: {multiEndpoint: true},
        configure: async (device, coordinatorEndpoint) => {
            await reporting.bind(device.getEndpoint(1), coordinatorEndpoint, ["genOnOff", "genDeviceTempCfg"]);
            await reporting.bind(device.getEndpoint(2), coordinatorEndpoint, ["genOnOff"]);
            await reporting.bind(device.getEndpoint(3), coordinatorEndpoint, ["genOnOff"]);
            await reporting.deviceTemperature(device.getEndpoint(1));
        },
        exposes: [e.switch().withEndpoint("left"), e.switch().withEndpoint("center"), e.switch().withEndpoint("right"), e.device_temperature()],
    },
    {
        zigbeeModel: ["TemperLight"],
        model: "HS2WDS",
        vendor: "Heiman",
        description: "LED 9W CCT E27",
        extend: [m.light({colorTemp: {range: [153, 370]}})],
    },
    {
        zigbeeModel: ["CurtainMo-EF-3.0", "CurtainMo-EF"],
        model: "HS2CM-N-DC",
        vendor: "Heiman",
        description: "Gear window shade motor",
        fromZigbee: [fz.cover_position_via_brightness],
        toZigbee: [tz.cover_via_brightness],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genLevelCtrl", "genPowerCfg"]);
            await reporting.brightness(endpoint);
        },
        exposes: [e.cover_position().setAccess("state", ea.ALL)],
    },
    {
        zigbeeModel: ["PIR_TPV16"],
        model: "HS1MS-M",
        vendor: "Heiman",
        description: "Smart motion sensor",
        fromZigbee: [fz.ias_occupancy_alarm_1],
        toZigbee: [],
        exposes: [e.occupancy(), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ["TY0202"],
        model: "HS1MS-EF",
        vendor: "Heiman",
        description: "Smart motion sensor",
        fromZigbee: [fz.ias_occupancy_alarm_1],
        toZigbee: [],
        exposes: [e.occupancy(), e.battery_low(), e.tamper()],
    },
    {
        fingerprint: [{modelID: "DoorBell-EM", manufacturerName: "HEIMAN"}],
        model: "HS2DB",
        vendor: "Heiman",
        description: "Smart doorbell button",
        fromZigbee: [fz.battery, fz.heiman_doorbell_button, fz.ignore_basic_report],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
        },
        exposes: [e.battery(), e.action(["pressed"]), e.battery_low(), e.tamper()],
    },
    {
        fingerprint: [{modelID: "DoorBell-EF-3.0", manufacturerName: "HEIMAN"}],
        model: "HS2SS-E_V03",
        vendor: "Heiman",
        description: "Smart doorbell button",
        fromZigbee: [fz.battery, fz.heiman_doorbell_button, fz.ignore_basic_report],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg"]);
            await reporting.batteryPercentageRemaining(endpoint);
        },
        exposes: [e.battery(), e.action(["pressed"]), e.battery_low(), e.tamper()],
    },
    {
        zigbeeModel: ["HS3AQ-EFA-3.0"],
        model: "HS3AQ",
        vendor: "Heiman",
        description: "Smart air quality monitor",
        fromZigbee: [fz.co2, fz.humidity, fz.battery, fz.temperature],
        toZigbee: [],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["msRelativeHumidity", "genPowerCfg", "msTemperatureMeasurement", "msCO2"]);
            await reporting.batteryPercentageRemaining(endpoint);
            await reporting.temperature(endpoint, {min: 1, max: constants.repInterval.MINUTES_5, change: 10}); // 0.1 degree change
            await reporting.humidity(endpoint, {min: 1, max: constants.repInterval.MINUTES_5, change: 10}); // 0.1 % change
            await reporting.co2(endpoint, {min: 5, max: constants.repInterval.MINUTES_5, change: 0.00005}); // 50 ppm change
        },
        exposes: [e.co2(), e.battery(), e.humidity(), e.temperature()],
    },
    {
        zigbeeModel: ["RouteLight-EF-3.0"],
        model: "HS2RNL",
        vendor: "Heiman",
        description: "Smart repeater & night light",
        fromZigbee: [fz.on_off, fz.battery],
        toZigbee: [tz.on_off],
        configure: async (device, coordinatorEndpoint) => {
            const endpoint = device.getEndpoint(1);
            await reporting.bind(endpoint, coordinatorEndpoint, ["genPowerCfg", "genOnOff", "genLevelCtrl"]);
            await reporting.onOff(endpoint); // switch the night light on/off
            await reporting.batteryPercentageRemaining(endpoint); // internal backup battery in case of power outage
        },
        exposes: [e.switch(), e.battery()],
    },
    {
        zigbeeModel: ["PIR_TPV12"],
        model: "PIR_TPV12",
        vendor: "Heiman",
        description: "Motion sensor",
        extend: [
            m.battery({voltageToPercentage: {min: 2500, max: 3000}, voltage: true}),
            m.iasZoneAlarm({zoneType: "occupancy", zoneAttributes: ["alarm_1", "tamper", "battery_low"]}),
        ],
    },
    {
        zigbeeModel: ["HS15A-M"],
        model: "HS15A-M",
        vendor: "Heiman",
        description: "Smoke detector relabeled for zipato",
        extend: [m.iasZoneAlarm({zoneType: "smoke", zoneAttributes: ["alarm_1", "tamper", "battery_low"]}), m.battery(), m.iasWarning()],
    },
];
