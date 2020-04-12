import { Component, OnInit } from '@angular/core';
import { LedDriverService } from 'src/app/services/led-driver.service';
import { RgbCalculatorService } from 'src/app/services/rgb-calculator.service';
import { EndpointsHealthService } from 'src/app/services/endpoints-health.service';

@Component({
    selector: 'app-led-control-panel',
    templateUrl: './led-control-panel.component.html',
    styleUrls: ['./led-control-panel.component.css']
})

export class LedControlPanelComponent implements OnInit {

    public currentColor: any = {};
    private disabled: boolean = true;

    public ledModesList = [
        {code: 0, title: 'AUTO'},
        {code: 1, title: 'MANUAL'},
        {code: 2, title: 'TIMED'}
    ];

    public ledMode = 1;
    public ledState = 0;

    public sliders = {
        'red': {
            'value': 155
        },
        'green': {
            'value': 155
        },
        'blue': {
            'value': 155
        },
        'coldWhite': {
            'value': 155
        },
        'warmWhite': {
            'value': 155
        },
    };

    constructor(
        private ledDriverService: LedDriverService,
        private rgbService: RgbCalculatorService,
        private healthService: EndpointsHealthService
    ) {
        this.ledMode = 1;
        this.currentColor = this.determineCurrentColor();
    }

    ngOnInit() {
        this.dispatchHealthCheck();

        this.healthService.subscribeOnEndpointsHealthState().subscribe(
            (status) => {
                if (status.ledController === false) {
                    this.disabled = true;
                } 
                
                if (status.ledController === true) {
                    this.disabled = false;
                }
            }
        );
    }

    resolveState() {
        return this.ledDriverService.resolveState(this.disabled, this.getLedState());
    }

    getLedState() {
        return !this.ledState;
    }

    determineCurrentColor() {
        return this.rgbService.determineCurrentColor(this.sliders);
    }

    setLedLightingState(data) {
        // console.log('setLedLightingState: ', data);

        this.ledMode = data.ledMode;
        this.ledState = data.ledState;

        this.currentColor = this.determineCurrentColor();
    }

    setSlidersStates(data) {
        // console.log('setSlidersStates: ', data);
        this.sliders.red.value = data.red.value;
        this.sliders.green.value = data.green.value;
        this.sliders.blue.value = data.blue.value;
        this.sliders.coldWhite.value = data.coldWhite.value;
        this.sliders.warmWhite.value = data.warmWhite.value;

        this.currentColor = this.determineCurrentColor();
        // this.dispatchLedControlAction();
    }

    toggleLedState($event) {
        // console.log('toggleLedState: ', Number($event));
        this.ledState = Number($event);
        this.dispatchLedControlAction();
    }

    ngGetLedLightingState() {
        this.currentColor = this.determineCurrentColor();

        return {
            state: +this.ledState,
            mode: this.ledMode,
            red: this.sliders.red.value,
            green: this.sliders.green.value,
            blue: this.sliders.blue.value,
            coldWhite: this.sliders.coldWhite.value,
            warmWhite: this.sliders.warmWhite.value,
        };
    }

    dispatchLedControlAction() {
        const data = this.ngGetLedLightingState();
        // console.log('dispatchLedControlAction::ngGetLedLightingState: ', data);

        this.ledDriverService.setLedParams(data)
            .then((data) => {
                // console.log('dispatchLedControlAction::data: ', data);
                this.setLedLightingState(data);
                this.currentColor = this.determineCurrentColor();
            });
    }

    dispatchHealthCheck() {
        // console.log('dispatchHealthCheck');
        this.ledDriverService.performHealthCheck()
            .then((data) => {
                // console.log('dispatchHealthCheck::data: ', data);
                this.setLedLightingState(data);
                this.setSlidersStates(data);
            });
    }

    onLedModeSelect(event) {
        console.log('onLedModeSelect: ', event);
        this.ledMode = event.value;
        this.dispatchLedControlAction();
    }

    onSlidersChange($event) {
        console.log('onSlidersChange: ', event);
        this.dispatchLedControlAction();
    }

}
