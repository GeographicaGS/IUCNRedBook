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

import os
import gdal
import osr


def rstSetProj(indata):

    in_ds = gdal.Open(indata, gdal.GA_Update)
    srs = osr.SpatialReference()
    srs.ImportFromEPSG(23029)
    srs_wkt = srs.ExportToWkt()

    in_ds.SetProjection(srs_wkt)

    in_ds = None


def main():
    infolder='/myfolder'

    fl_fltr = ".tif"

    for subdir, dirs, files in os.walk(infolder):
        for fl in files:
            if os.path.splitext(fl)[1] == fl_fltr:
                indata = os.path.join(subdir, fl)

                result = rstSetProj(indata)
                print result
                if result != 0:
                    print "Setting projection failed: {}".format(indata)
                else:
                    print "Setting projection successful: {}".format(indata)


if __name__ == "__main__":

    # gdal.UseExceptions()

    main()
