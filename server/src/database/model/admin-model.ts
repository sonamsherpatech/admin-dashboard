import {
  Model,
  Table,
  Column,
  DataType,
  ForeignKey,
  BelongsTo,
} from "sequelize-typescript";
import User from "./user-model";

@Table({
  tableName: "admins",
  modelName: "Admin",
  timestamps: true,
})
class Admin extends Model {
  @Column({
    primaryKey: true,
    type: DataType.UUID,
    defaultValue: DataType.UUIDV4,
  })
  declare admin_id: string;

  @ForeignKey(() => User)
  @Column({
    type: DataType.UUID,
  })
  declare user_id: string;

  @BelongsTo(() => User)
  declare user: User;
}


export default Admin