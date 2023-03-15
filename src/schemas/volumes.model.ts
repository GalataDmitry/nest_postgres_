import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Volumes extends Model {

  @Column
  ing_volume: string

}