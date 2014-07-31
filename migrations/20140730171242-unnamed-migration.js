module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
        'authors',
        'username', {
        	type: DataTypes.STRING,
          	unique: true, 
          	allowNull: false,
        })
    	.complete(done)
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropColumn('authors', 'username')
    .complete(done)
  }
}
