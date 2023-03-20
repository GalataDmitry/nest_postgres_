import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Cockts } from './cockts.model';
import { Ings } from './ings.model';
import { Volumes } from './volumes.model';

@Table
export class Cockts_ings_volumes extends Model {

  @BelongsTo(() => Cockts, {as: 'cockt'})// is work
  @ForeignKey(() => Cockts)
  @Column
  cockt_id: number;

  @BelongsTo(() => Ings, {as: 'ing'})// is work
  @ForeignKey(() => Ings)
  @Column
  ing_id: number;

  @BelongsTo(() => Volumes, {as: 'vol'})// is work
  @ForeignKey(() => Volumes)
  @Column
  vol_id: number;


}