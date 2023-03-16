import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Cockts } from './cockts.model';
import { Cockts_ings_volumes } from './cockts_ings_volumes.model';
import { Ings } from './ings.model';

@Table
export class Volumes extends Model {

  @Column
  ing_volume: string;

  @BelongsToMany(() => Ings, () => Cockts_ings_volumes)
  ings: Ings[];
  @BelongsToMany(() => Cockts, () => Cockts_ings_volumes)
  cockts: Cockts[];

}