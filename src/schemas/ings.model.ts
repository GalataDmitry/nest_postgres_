import { BelongsToMany, Column, HasMany, Model, Table } from 'sequelize-typescript';
import { Cockts_ings_volumes } from './cockts_ings_volumes.model';
import { Volumes } from './volumes.model';

@Table
export class Ings extends Model<Ings> {

  @Column
  ing_name: string;

  // @BelongsToMany(() => Volumes, () => Cockts_ings_volumes, 'ing_id')
  @HasMany(() => Cockts_ings_volumes)// is work
  volumes: Volumes[];

}