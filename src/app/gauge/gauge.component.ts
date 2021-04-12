import { Component, OnInit } from '@angular/core';
import {FluxTableMetaData, InfluxDB, Point} from '@influxdata/influxdb-client';

@Component({
  selector: 'app-gauge',
  templateUrl: './gauge.component.html',
  styleUrls: ['./gauge.component.scss']
})
export class GaugeComponent implements OnInit {

  constructor() {
    const influxDB = new InfluxDB({url, token});
    const queryApi = influxDB.getQueryApi(org);
    const fluxQuery =
      `from(bucket:"<my-bucket>")
        |> range(start: 0)
        |> filter(fn: (r) => r._measurement == "temperature")`;

    queryApi.queryRows(fluxQuery, {
      next(row: string[], tableMeta: FluxTableMetaData): void {
        const obj = tableMeta.toObject(row);
        console.log(JSON.stringify(obj, null, 2));
      },
      error(error: Error): void {
        console.error(error);
        console.log('\nFinished ERROR');
      },
      complete(): void {
        console.log('\nFinished SUCCESS');
      },
    });
  }

  ngOnInit(): void {
  }

}
