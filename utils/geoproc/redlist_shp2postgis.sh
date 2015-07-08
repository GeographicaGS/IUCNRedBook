#!/usr/bin/env bash

#
#  Author: Cayetano Benavent, 2015.
#  https://github.com/GeographicaGS/IUCNRedBook
#
#  This program is free software; you can redistribute it and/or modify
#  it under the terms of the GNU General Public License as published by
#  the Free Software Foundation; either version 2 of the License, or
#  (at your option) any later version.
#
#  This program is distributed in the hope that it will be useful,
#  but WITHOUT ANY WARRANTY; without even the implied warranty of
#  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#  GNU General Public License for more details.
#
#  You should have received a copy of the GNU General Public License
#  along with this program; if not, write to the Free Software
#  Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
#  MA 02110-1301, USA.
#

######################################################################
# Before execute this script you need a CONFIGFILE properly          #
# formed (See CONFIGFILE_example) in your current/working directory. #
######################################################################

CURRDIR=$(pwd)
. $CURRDIR/CONFIGFILE

SHPEXT=shp
SHAPEFILES=$(find $GEODATAFOLDER -type f | grep "\."$SHPEXT)

for SHP in $SHAPEFILES;
    do
        (
          echo "\nProcessing file: " $SHP
          LAYERNAME=$(basename $SHP .shp)
          echo "SHP2PGSQL - exporting shapefile..."
          shp2pgsql -s $CRS_EPSG -I $SHP $DBSCHEMA.$LAYERNAME >> $SQLFILE
        )
    done

echo "\nPSQL - Executing query: " $SQLFILE
psql -h $HOST -d $DATABASE -p $PORT -U $USER -f $SQLFILE -q

$(rm $SQLFILE)
echo "\nRemoved generated SQL file..."
echo "\nProcess finished\n"
