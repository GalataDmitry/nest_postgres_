import { BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Cockts_ings_volumes } from './cockts_ings_volumes.model';

@Table
export class Volumes extends Model {

  @Column
  // @BelongsToMany(() => Ings,() => Cockts_ings_volumes)
  @HasMany(() => Cockts_ings_volumes, {as: 'ing_vol'})// is work
  ing_volume: string;

}