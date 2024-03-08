import { HttpException } from '@nestjs/common';
export enum BuildingExceptionType {
  ApartmentConstraint = 511,
  MissingRank = 512,
}
const messages: { [code: number]: string } = {
  [BuildingExceptionType.ApartmentConstraint]: 'Some apartments are attached to this building'
};
export class BuildingException extends HttpException {
  constructor(type: BuildingExceptionType) {
    super(messages[type], type);
  }
}