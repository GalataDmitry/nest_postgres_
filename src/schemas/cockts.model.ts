import { BelongsToMany, Column, HasOne, Model, Table } from 'sequelize-typescript';
import { Descs } from './descs.model';
import { Ings } from './ings.model';
import { Cockts_ings_volumes } from './cockts_ings_volumes.model';
import { Volumes } from './volumes.model';

@Table
export class Cockts extends Model {

  @Column
  cockt_name: string;

  @BelongsToMany(() => Ings, () => Cockts_ings_volumes)
  ings: Ings[];
  @BelongsToMany(() => Volumes, () => Cockts_ings_volumes)
  volumes: Volumes[];
  @HasOne(() => Descs)
  descs: Descs;
}

