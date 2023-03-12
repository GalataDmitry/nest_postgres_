import { Column, HasOne, Model, Table } from 'sequelize-typescript';
import {Descs} from './descs.model';

@Table
export class Cockts extends Model {

  @Column
  cockt_name: string;

  @HasOne(() => Descs, "cockt_id")
  descs: Descs
}

