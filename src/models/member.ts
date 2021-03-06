import { idGen } from '~/utils/common'
import Issue from './issue'

interface MemberOptions {
  name: string,
  issues: Array<Issue>
}

/**
 * 成员
 * 
 * @export
 * @class Member
 */
export default class Member {

  /**
   * id
   * 
   * @type {string}
   * @memberof Issue
   */
  public _key: string = idGen()

  /**
   * 姓名
   * 
   * @type {string}
   * @memberof Member
   */
  public name: string

  /**
   * 此人所背负的那些苦差事儿
   * 
   * @type {Array<Issue>}
   * @memberof Member
   */
  public issues: Array<Issue>

  constructor({
    name,
    issues
  }: MemberOptions) {
    this.name = name
    this.issues = issues
  }
}