import { idGen } from '~/utils/common'
import { Moment, Duration } from 'moment'

export default class Schedule {
  public _id: string = ''
  public ownerId: string = ''
  public groupId: string = ''
  public title: string = ''
  public description: string = ''
  public start: Moment
  public duration: Duration
}