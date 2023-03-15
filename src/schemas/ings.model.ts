import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Ings extends Model {

  @Column
  ing_name: string

}