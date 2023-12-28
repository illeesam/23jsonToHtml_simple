

function createTable(jsonObj) {
    if (jsonObj instanceof Array) {
        return _make_array(jsonObj);
    }else if (jsonObj instanceof Object) {
        return _make_object(jsonObj);
    }else{
        return null;
    }
}

// arrray table생성
function _make_array(jsonObj) {
    var _table = document.createElement("table");
    _table.setAttribute("class", "arr_table");

    var _thead = document.createElement("thead"); // 헤더 생성
    _thead.setAttribute("class", "arr_thead");
    var _htr = document.createElement("tr");
    _htr.setAttribute("class", "arr_htr");
    for (var key in jsonObj[0]) {
        var _hth = document.createElement("th");
        _hth.setAttribute("class", "arr_hth");
        _hth.appendChild(document.createTextNode(key));
        _htr.appendChild(_hth);
    }
    _thead.appendChild(_htr);
    _table.appendChild(_thead);

    var _tbody = document.createElement("tbody"); // 바디 생성
    _tbody.setAttribute("class", "arr_tbody");
        
      for (let i = 0; i < jsonObj.length; i++) {
        let _tr = document.createElement("tr");
        _tr.setAttribute("class", "arr_tr");
        let _tdx = document.createElement("td");
        _tdx.setAttribute("class", "arr_tdx");
        _tdx.appendChild(_out_value("", "" + (i + 1) + "/" + jsonObj.length)); // 일반값인 경우
        _tr.appendChild(_tdx);
        for (let key in jsonObj[i]) {
          let _td = document.createElement("td");
          _td.setAttribute("class", "arr_td");
          let value = jsonObj[i][key];
          if (value instanceof Array) {
            _td.appendChild(_make_array(value));
          } else if (value instanceof Object) {
            _td.appendChild(_make_object(value));
          } else {
            _td.appendChild(_out_value(key, value)); // 일반값인 경우
          }
          _tr.appendChild(_td);
        }
        _tbody.appendChild(_tr);
      }
    
    _table.appendChild(_tbody);
    return _table;
}

// object table생성
function _make_object(jsonObj) {
    var _table = document.createElement("table");
    _table.setAttribute("class", "obj_table");
    var _tbody = document.createElement("tbody"); // 바디 생성
    _tbody.setAttribute("class", "obj_tbody");
    
    for(let key in jsonObj) {
        let value = jsonObj[key];
        var _tr = document.createElement("tr");
        _tr.setAttribute("class", "obj_tr");
        var _td1 = document.createElement("td");
        _td1.setAttribute("class", "obj_td1");
        _td1.appendChild(_make_value(key));
        _tr.appendChild(_td1);
        var _td2 = document.createElement("td");
        _td2.setAttribute("class", "obj_td2");
        if (value instanceof Array) {
            _td2.appendChild(_make_array(value));
        }else if (value instanceof Object) {
            _td2.appendChild(_make_object(value));
        }else{
            _td2.appendChild(_make_value(value));
        }
        _tr.appendChild(_td2);
        _tbody.appendChild(_tr);
    }
    
    _table.appendChild(_tbody);
    return _table;
}

// 값 생성
function _make_value(value) {
    return document.createTextNode(JSON.stringify(value));
}



