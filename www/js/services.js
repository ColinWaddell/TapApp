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
        'INSERT INTO favorites (location, notifications) VALUES (?,?)',
        [location, 0])
      .then(function(result){
        return result.insertId;
      });
    }

    self.delete = function (id){
      return DB.query(
        'DELETE FROM favorites WHERE id = ?', [id]);
    }

    self.deleteAll= function () {
      return DB.query(
        'DELETE FROM favorites');
    }

    return self;
})

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}]);
