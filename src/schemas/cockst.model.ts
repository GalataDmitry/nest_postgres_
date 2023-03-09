import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Cockts extends Model {
  @Column
  cocktName: string;
  @Column
  description: string
}
