import { BelongsTo, Column, ForeignKey, Model, Table } from 'sequelize-typescript';
import { Cockts } from './cockts.model';

@Table
export class Descs extends Model {

  @Column
  desc: string

  @ForeignKey(() => Cockts)
  @Column({unique: true, allowNull: false})//autoIncrement: true
  cockt_id: number

  @BelongsTo(() => Cockts )
  cockts: Cockts
}
