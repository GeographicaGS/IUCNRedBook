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
import sys
from osgeo import gdal, ogr, osr


def rst2vct(indata, outdata, band_n=1, maskband=None, frmt="ESRI Shapefile"):

    in_ds = gdal.Open(indata, gdal.GA_ReadOnly)

    if in_ds is None:
        print "Unable to open {}".format(indata)
        sys.exit(1)

    drv = ogr.GetDriverByName(frmt)

    out_lyr_name = os.path.splitext(os.path.basename(indata))[0]

    if os.path.exists(outdata):
        drv.DeleteDataSource(outdata)

    out_ds = drv.CreateDataSource(outdata)

    srs = osr.SpatialReference()
    srs.ImportFromWkt(in_ds.GetProjectionRef())

    out_lyr = out_ds.CreateLayer(out_lyr_name, srs=srs, geom_type=ogr.wkbPolygon)

    out_field_name = "values"
    fd = ogr.FieldDefn(out_field_name, ogr.OFTInteger)
    out_lyr.CreateField(fd)
    out_field = 0

    in_band = in_ds.GetRasterBand(band_n)

    gdal.Polygonize(in_band, maskband, out_lyr, out_field)

    in_band = None
    in_ds = None
    out_ds = None


def filterShpByValue(indata, flt_outdata, flt_field, flt_value, frmt="ESRI Shapefile"):
    # Get the input Layer
    in_drv = ogr.GetDriverByName(frmt)
    in_ds = in_drv.Open(indata, 0)
    in_lyr = in_ds.GetLayer()
    in_lyr.SetAttributeFilter("{0} != {1}".format(flt_field, flt_value))

    out_drv = ogr.GetDriverByName(frmt)

    if os.path.exists(flt_outdata):
        out_drv.DeleteDataSource(flt_outdata)

    out_ds = out_drv.CreateDataSource(flt_outdata)
    out_lyr_name = os.path.splitext(os.path.split(flt_outdata)[1])[0]

    out_lyr = out_ds.CopyLayer(in_lyr,'filtered_layer')

    in_ds = None
    out_ds = None


def main():
    infolder = "/myfolder"
    outfolder = "/tmp/pruebas"
    fl_fltr = ".tif"
    flt_value = 0
    flt_field = "values"

    for subdir, dirs, files in os.walk(infolder):
        for fl in files:
            if os.path.splitext(fl)[1] == fl_fltr:
                indata = os.path.join(subdir, fl)
                outdata = os.path.join(outfolder, os.path.splitext(fl)[0] + ".shp")
                flt_outdata = os.path.join(outfolder, os.path.splitext(os.path.split(outdata)[1])[0] + "_flt.shp")

                print "Inputa data to process: {}".format(indata)

                rst2vct(indata, outdata)
                print "Output data processed: {}".format(outdata)

                filterShpByValue(outdata, flt_outdata, flt_field, flt_value)
                print "Output data processed (FILTERED): {}\n".format(flt_outdata)


if __name__ == "__main__":

    # gdal.UseExceptions()

    main()
