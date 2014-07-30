module.exports = {
  up: function(migration, DataTypes, done) {
    // add altering commands here, calling 'done' when finished
    migration.addColumn(
        'posts', 'title', {
        	type: DataTypes.STRING
        })
    	.complete(done)
	},
  down: function(migration, DataTypes, done) {
    // add reverting commands here, calling 'done' when finished
    migration.dropColumn('post', 'title')
    .complete(done)
  }
}
