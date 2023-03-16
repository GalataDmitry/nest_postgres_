import { BelongsToMany, Column, Model, Table } from 'sequelize-typescript';
import { Cockts_ings_volumes } from './cockts_ings_volumes.model';
import { Volumes } from './volumes.model';
import { Cockts } from './cockts.model';

@Table
export class Ings extends Model {

  @Column
  ing_name: string;

  @BelongsToMany(() => Volumes, () => Cockts_ings_volumes)
  volumes: Volumes[];
  @BelongsToMany(() => Cockts, () => Cockts_ings_volumes)
  cockts: Cockts[];

}