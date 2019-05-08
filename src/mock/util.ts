import { MockMatchOpt } from "../const/schema.const";
import { MockConditionMatcher, MockCondition } from "./mock.entity";
import { isDeepStrictEqual } from "util";

export function isAllConditionMatch(conditionList: MockCondition, toBeCheck:object) {
  return conditionList.some(condition => {
    return Object.entries(condition).every(([cKey, cValue]) => {
      return toBeCheck.hasOwnProperty(cKey) && isConditionMatch(cValue, toBeCheck[cKey])
    })
  })
}

export function isConditionMatch(rule: MockConditionMatcher, value:string):boolean {
  if (rule.opt === MockMatchOpt.Equal) {
    return value === rule.value;
  } else if (rule.opt === MockMatchOpt.In) {
    return value && rule.value.split(',').includes(value);
  } else if (rule.opt === MockMatchOpt.RegExp) {
    if (!rule.value) {
      return false;
    }

    let raw = rule.value;
    let lastSlashIndex = raw.lastIndexOf('/');

    let re:RegExp;
    if (lastSlashIndex < 0) {
      re = new RegExp(raw);
    } else {
      let core = raw.substr(1, raw.lastIndexOf('/') - 1);
      let options = raw.slice(raw.lastIndexOf('/') + 1);
      re = options ? new RegExp(core, options) : new RegExp(core);
    }

    return re.test(value);
  }
}


export function isPartOfObject(part:object, full:object):boolean {
  for(let [key,value] of Object.entries(part)) {
    if (!isDeepStrictEqual(full[key], value)) return false
  }
  return true
}