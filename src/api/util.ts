export function isMatch(schemaPath: string, requestPath:string):boolean {
  const regExp = new RegExp('^('+schemaPath.replace(/\/:[\w-]+|\/\{[\w-]+\}/g, '/[\\w-]+')+')$')
  return regExp.test(requestPath)
}


export function isVariablePath(path:string) {
  return /\/:[\w-]+|\/\{[\w-]+\}/g.test(path)
}

/**
 * filter out variables in path
 * eg: /demo/:id/detail/{prop} --> ['id', 'prop']
 * @param path 
 */
function getVariableKeys(path:string):string[] {
  let re = /\/:([\w-]+)|\/\{([\w-]+)\}/g; // /:xx or /{xx}
  let variableNames = [], result;
  do {
    result = re.exec(path);
    if (result && result.length > 2) {
      variableNames.push(result[1] || result[2]);
    } else {
      break;
    }
  } while (result);

  return variableNames;
}

export function getVariablePathValue(schemaPath:string, requestPath:string):{} {
  let variableNames = getVariableKeys(schemaPath);
  let variableMap = {};

  if (variableNames.length > 0) {
    let re = new RegExp(
      '^(' +
      schemaPath
        .replace(/\/:[\w-]+/g, '/([\\w-]+)')
        .replace(/\/\{[\w-]+\}/g, '/([\\w-]+)') +
      ')$'
    );
    // console.log('the regexp is: ' + re);
    let result = re.exec(requestPath);
    if (result && result.length > variableNames.length + 1) {
      result.slice(2, 2 + variableNames.length).forEach((value, idx) => {
        variableMap[variableNames[idx]] = value;
      });
      // console.log(
      //   `variable path <${requestPath}> on <${schemaPath}> get map:`,
      //   variableMap
      // );
    } else {
      console.log(`WARN: <${requestPath}> not match <${schemaPath}>`);
    }
  } else {
    console.log(`WARN: '<${schemaPath}> is not a variable path.`);
  }

  return variableMap;
}