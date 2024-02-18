const CrudRepository = require("./crud-repositories");
const { Role } = require("../models");

class RoleRepository extends CrudRepository {
  constructor() {
    super(Role);
  }
  async getRoleByName(name) {
    const role = await Role.findOne({ where: { role: name } });
    return role;
  }
}

module.exports = RoleRepository;
