// Retruco-API -- HTTP API to bring out shared positions from argumented statements
// By: Paula Forteza <paula@retruco.org>
//     Emmanuel Raviart <emmanuel@retruco.org>
//
// Copyright (C) 2016 Paula Forteza & Emmanuel Raviart
// https://git.framasoft.org/retruco/retruco-api
//
// Retruco-API is free software; you can redistribute it and/or modify
// it under the terms of the GNU Affero General Public License as
// published by the Free Software Foundation, either version 3 of the
// License, or (at your option) any later version.
//
// Retruco-API is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU Affero General Public License for more details.
//
// You should have received a copy of the GNU Affero General Public License
// along with this program.  If not, see <http://www.gnu.org/licenses/>.


import {checkDatabase, db, entryToStatement, generateStatementTextSearch} from "./database"


async function generateTextSearch () {
  let statements = (await db.any("SELECT * FROM statements")).map(entryToStatement)
  for (let statement of statements) {
    await generateStatementTextSearch(statement)
  }
  process.exit(0)
}


checkDatabase()
  .then(generateTextSearch)
  .catch(error => {
    console.log(error.stack)
    process.exit(1)
  })