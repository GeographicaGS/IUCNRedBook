# -*- coding: utf-8 -*-
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


import os
import shutil
import psycopg2
import getpass


def getLayerList(my_database, my_password, my_user, my_host, my_port, my_query):
    """
    Get a list of layers to export from PostGIS (You must define a SQL Query)

    """

    print "Getting data from PostGIS..."

    try:
        conn = psycopg2.connect(database=my_database, user=my_user,
        password=my_password, host=my_host, port=my_port)

        cur = conn.cursor()
        cur.execute(my_query)

        res = cur.fetchall()

        cur.close()
        conn.close()

        return res

    except Exception as err:
        print err


def exportShp01(tables, folder, my_password, my_database, my_user, my_host, my_port):
    """
    With ogr2ogr

    """

    print "Exporting layers from PostGIS to shp..."

    try:
        fmt = '-f "ESRI Shapefile"'
        connpar = 'PG:"host={0} user={1} dbname={2} password={3} port={4}"'.format(my_host, my_user, my_database, my_password, my_port)

        for t in tables:
            shpfolder = os.path.join(folder, t[1])
            createFolder(shpfolder)

            shpname = os.path.join(shpfolder, t[1] + '.shp')
            shpname = os.path.join(folder, t[1])
            tablename = '{0}.{1}'.format(t[0], t[1])
            cmd = 'ogr2ogr {0} {1} {2} {3}'.format(fmt, shpname, connpar, tablename)
            os.system(cmd)

            zipShp(shpname)
            removeFolder(shpfolder)

    except Exception as err:
        print err

def exportShp02(tables, folder, my_password, my_database, my_user, my_host, my_port):
    """
    With pgsql2shp

    """

    print "Exporting layers from PostGIS to shp..."

    try:

        for t in tables:

            shpfolder = os.path.join(folder, t[1])
            createFolder(shpfolder)

            shpname = os.path.join(shpfolder, t[1])
            tablename = '{0}.{1}'.format(t[0], t[1])
            cmd = 'pgsql2shp -f "{0}" -h {1} -u {2} -p {3} -P {4} {5} {6}'.format(shpname, my_host, my_user,  my_port, my_password, my_database, tablename)
            os.system(cmd)

            zipShp(shpfolder)
            removeFolder(shpfolder)

    except Exception as err:
        print err


def zipShp(folder):
    """
    Zip shapefile folder

    """
    print "Zipping shp layers: {}.zip".format(folder)
    shutil.make_archive(folder, 'zip', folder)


def createFolder(shpfolder):
    """
    Create a folder to store all files from each shapefile

    """
    if not os.path.exists(shpfolder):
        os.makedirs(shpfolder)


def removeFolder(shpfolder):
    """
    Removing shapefile folders (after zip)

    """
    shutil.rmtree(shpfolder)


def readConfigFile(pathtoconfig):
    """
    Reading config file and storing it in a dictionary
    """
    with open(pathtoconfig) as f:
        lns = f.read().splitlines()

    confg_lst = [l.strip().split('=') for l in lns if '=' in l]

    return {k: val for (k, val) in confg_lst}


def main():

    pathtoconfig = "CONFIGFILE"
    cfg_dict = readConfigFile(os.path.join(os.getcwd(), pathtoconfig))

    my_database = cfg_dict["DATABASE"]
    my_user = cfg_dict["USER"]
    my_host = cfg_dict["HOST"]
    my_port = cfg_dict["PORT"]
    folder = cfg_dict["EXPORTFOLDER"]
    dbschema = cfg_dict["DBSCHEMA"]
    my_password = getpass.getpass("Enter password for user {}: ".format(my_user))
    my_query = '''
                 SELECT schemaname, viewname
                    FROM pg_views
                    WHERE schemaname='{}';
                '''.format(dbschema)

    tb = getLayerList(my_database, my_password, my_user, my_host, my_port, my_query)

    if tb:
        # exportShp01(tb, folder, my_password, my_database, my_user, my_host, my_port)
        exportShp02(tb, folder, my_password, my_database, my_user, my_host, my_port)

    else:
        print "No layers to export. Check DB schema..."

if __name__ == "__main__":
    main()
