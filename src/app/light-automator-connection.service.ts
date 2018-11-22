import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { environment } from '../environments/environment';

import {TimedMode} from './timed-mode';
import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class LightAutomatorConnectionService {

    private baseUrl = environment.nestTimedSettingsUrl;

    constructor(private httpClient: HttpClient) { }

    getTimedModes() {
        const prom = this.httpClient.get(`${this.baseUrl}/get-light-time-programs`);

        return new Promise(function(resolve, reject) {
            prom.subscribe((rawData) => {
                // console.log('rawData: ', rawData);
                let outData = [];
                _.forEach(rawData, (val, key) => {
                    // console.log('timedMode: ', val, key);
                    outData[key] = new TimedMode(val);
                });

                resolve(outData);
            });
        });
    }

    createTimedMode(payload) {
        console.log('payload', payload);
        const prom = this.httpClient.post(`${this.baseUrl}/add-light-time-program`, payload);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    editTimedMode(payload) {
        console.log('payload', payload);
        const prom = this.httpClient.post(`${this.baseUrl}/edit-light-time-program`, payload);
        return new Promise( (resolve, reject) => {
            prom.subscribe((rawData) => {
                resolve(rawData);
            });
        });
    }

    deleteTimedMode(a) {
        return new Promise( (resolve, reject) => {
            resolve(a);
        });
    }
}
