import { BelongsToMany, Column, HasMany, HasOne, Model, Table } from 'sequelize-typescript';
import { Descs } from './descs.model';
import { Ings } from './ings.model';
import { Cockts_ings_volumes } from './cockts_ings_volumes.model';
import { Volumes } from './volumes.model';

@Table
export class Cockts extends Model<Cockts> {

  @Column
  cockt_name: string;

  // @BelongsToMany(() => Ings, () => Cockts_ings_volumes, 'cockt_id')
  @HasMany(() => Cockts_ings_volumes)// is work
  Ings: Ings[]


  @HasOne(() => Descs)
  descs: Descs;
}