angular.module('app.services', [])

.factory('DB', function($q, DB_CONFIG) {
    var self = this;
    self.db = null;

    self.init = function() {
        // Use self.db = window.sqlitePlugin.openDatabase({name: DB_CONFIG.name}); in production
        self.db = window.openDatabase(DB_CONFIG.name, '1.0', 'database', -1);

        angular.forEach(DB_CONFIG.tables, function(table) {
            var columns = [];

            angular.forEach(table.columns, function(column) {
                columns.push(column.name + ' ' + column.type);
            });

            var query = 'CREATE TABLE IF NOT EXISTS ' + table.name + ' (' + columns.join(',') + ')';
            self.query(query);
            console.log('Table ' + table.name + ' initialized');
        });
    };

    self.query = function(query, bindings) {
        bindings = typeof bindings !== 'undefined' ? bindings : [];
        var deferred = $q.defer();

        self.db.transaction(function(transaction) {
            transaction.executeSql(query, bindings, function(transaction, result) {
                deferred.resolve(result);
            }, function(transaction, error) {
                deferred.reject(error);
            });
        });

        return deferred.promise;
    };

    self.fetchAll = function(result) {
        var output = [];

        for (var i = 0; i < result.rows.length; i++) {
            output.push(result.rows.item(i));
        }

        return output;
    };

    self.fetch = function(result) {
        return result.rows.item(0);
    };

    return self;
})

.factory('Favorites', function(DB) {
    var self = this;

    self.all = function() {
        return DB.query('SELECT * FROM favorites')
        .then(function(result){
            return DB.fetchAll(result);
        });
    };

    self.getById = function(id) {
        return DB.query('SELECT * FROM favorites WHERE id = ?', [id])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    self.getByLocation = function(location) {
        return DB.query('SELECT * FROM favorites WHERE location = ?', [location])
        .then(function(result){
            return DB.fetch(result);
        });
    };

    self.add = function(location) {
      return DB.query(
        'INSERT INTO favorites (location, notify) VALUES (?,?)',
        [location, 0])
      .then(function(result){
        return result.insertId;
      });
    }

    self.setNotification = function(id, enabled){
      enabled = enabled===true ? '1' : '0';
      return DB.query(
        'UPDATE favorites SET notify = (?) WHERE id = (?)', [enabled, id])
        .then(function(result){
          console.log(result);
        });
    }

    self.delete = function (id){
      return DB.query(
        'DELETE FROM favorites WHERE id = ?', [id]);
    }

    self.deleteAll= function () {
      return DB.query(
        'DROP TABLE favorites')
      .then(function(result){
        DB.init();
      });
    }

    return self;
})

.factory('Placenames', function(PLACENAMES) {
    var self = this;
    self.placenames = {};

    self.loadPlaceNames = function(){
      for(i=0; i<PLACENAMES.length; i++){
        id = PLACENAMES[i].substring(0,3).toLowerCase();
        if(self.placenames.hasOwnProperty(id))
          self.placenames[id].push(PLACENAMES[i]);
        else
          self.placenames[id] = [PLACENAMES[i]];
      }
    };

    self.getNames = function(name){
      if (name.length < 3) return [];

      id = name.substring(0,3).toLowerCase();
      if(!PLACENAMES.hasOwnProperty(id)) return [];

      places = PLACENAMES[id].filter(
        function(placename){
          return placename
                   .toLowerCase()
                   .search(name.toLowerCase()) !== -1 ? placename : null;
        }
      );

      return places;
    }

    self.loadPlaceNames();
    return self;
})

.factory('Settings', function(DB, SETTINGSDFTL) {
    var self = this;

    self.preloadSettingsDefaults = function(){
      DB.query("INSERT INTO settings (tempScale, iconDefault) VALUES (?,?)",
        [SETTINGSDFTL.tempScale, SETTINGSDFTL.iconDefault]);
    }

    self.get = function(){
      return DB.query('SELECT * FROM settings WHERE id = 1')
      .then(function(result){
          return DB.fetch(result);
      });
    }

    self.update = function(setting, value){
      return DB.query(
        'UPDATE favorites SET '+setting+' = (?) WHERE id = 1', [value])
        .then(function(result){
          console.log(result);
        });
    }

    self.init = function(){
      /* Check if settings are empty
         and preload with defaults
         if required */
      return DB.query(
        "SELECT count(*) FROM settings")
      .then(function(count){
        count = count.rows[0]['count(*)'];
        if(!count){
          self.preloadSettingsDefaults();
        }
      });

    }

    self.init();
    return self;
})

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);
