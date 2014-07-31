module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
        'authors',
        'password',{
        	type: DataTypes.STRING,
        	allowNull: false
        })
    	.complete(done)
  },
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropColumn('authors', 'password')
    .complete(done)
  }
}
