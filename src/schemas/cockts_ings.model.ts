import { Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Cockts } from './cockts.model';
import { Ings } from './ings.model';

@Table
export class Cockts_ings extends Model {

  @Column
  @ForeignKey(() => Cockts)
  cockt_id: number

  @Column
  @ForeignKey(() => Ings)
  ing_id: number
}