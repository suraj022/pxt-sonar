enum PingUnit {
    //% block="μs"
    MicroSeconds,
    //% block="cm"
    Centimeters,
    //% block="inches"
    Inches
}

/**
 * Sonar and ping utilities
 */
//% color="#2c3e50" weight=10
namespace sonar {
    /**
     * Send a ping and get the echo time (in microseconds) as a result
     * @param trig tigger pin
     * @param echo echo pin
     * @param unit desired conversion unit
     * @param maxCmDistance maximum distance in centimeters (default is 500)
     */
    //% blockId=sonar_ping block="ping trig %trig echo %echo unit %unit"
    export function ping(trig: DigitalInOutPin, echo: DigitalInOutPin, unit: PingUnit, maxCmDistance = 500): number {
        // send pulse
        trig.digitalWrite(false);
        control.waitMicros(2);
        trig.digitalWrite(true);
        control.waitMicros(10);
        trig.digitalWrite(false);
        
        // read pulse
        const d = echo.pulseIn( PulseValue.High, maxCmDistance * 58);

        switch (unit) {
            case PingUnit.Centimeters: return Math.idiv(d, 58);
            case PingUnit.Inches: return Math.idiv(d, 148);
            default: return d ;
        }
    }
}
