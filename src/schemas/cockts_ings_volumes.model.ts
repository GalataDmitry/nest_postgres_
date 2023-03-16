import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Cockts } from './cockts.model';
import { Ings } from './ings.model';
import { Volumes } from './volumes.model';

@Table
export class Cockts_ings_volumes extends Model {

  @Column
  @ForeignKey(() => Cockts)
  cockt_id: number;

  @Column
  @ForeignKey(() => Ings)
  ing_id: number;

  @Column
  @ForeignKey(() => Volumes)
  vol_id: number;

}