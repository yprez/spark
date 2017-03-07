var bookshelf = require('../libs/db').bookshelf;
var constants = require('./constants.js');

var Role = bookshelf.Model.extend({
    tableName: constants.VOL_DEPARTMENT_ROLES_TABLE_NAME,
    volunteers: function() {
        return this.belongsToMany(Volunteer,'id', 'role_id');
    }
});

var TypeInShift = bookshelf.Model.extend({
    tableName: constants.VOL_TYPES_IN_SHIFT_TABLE_NAME
});

//Department
var Department = bookshelf.Model.extend({
    tableName: constants.VOL_DEPARTMENTS_TABLE_NAME,
    volunteers: function() {
        return this.hasMany(Volunteer, 'department_id');
    },
    shifts: function() {
        return this.hasMany(Shift, 'id')
    }
});
//Volunteer
var Volunteer = bookshelf.Model.extend({
    tableName: constants.VOLUNTEERS_TABLE_NAME,
    department: function() {
        return this.belongsTo(Department, 'department_id');
    },
    role: function() {
        return this.belongsTo(Role, 'role_id', 'id');
    },
    type_in_shift: function() {
        return this.belongsTo(TypeInShift, 'type_in_shift_id');
    }
    
});

//Shift
var Shift = bookshelf.Model.extend({
    tableName: constants.VOL_SHIFTS_TABLE_NAME,
    schedule: function() {
        return this.hasMany(Schedule, 'shift_id')
    },
    department: function() {
        return this.belongsTo(Department, 'department_id')
    },
});

//Schedule
var Schedule = bookshelf.Model.extend({
    tableName: constants.VOL_SCHEDULE_TABLE_NAME,
    volunteer: function() {
        return this.belongsTo(Volunteer, 'user_id', 'user_id')
    },
    shifts: function() {
        return this.belongsTo(Shift, 'shift_id')
    }

});

module.exports = {
    Volunteer: Volunteer,
    Role: Role,
    Shift: Shift,
    Department: Department,
    Schedule: Schedule,
    TypeInShift: TypeInShift
}