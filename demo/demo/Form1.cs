﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Windows.Forms;

namespace demo
{
  public partial class Form1 : Form
  {

    Dictionary<String, String> mapsWeb = new Dictionary<string, string>();

    public Form1()
    {
      //Add items to the dictionary
      mapsWeb.Add("", null);
      InitializeComponent(mapsWeb.Keys.ToList());
    }

    private void ButtonClick(object sender, EventArgs e)
    {
      Program pg = new Program();
      button1.Visible = false;
      pg.GenerateReport(comboBox1.Text, label2, mapsWeb);
    }

    private void comboBox1_SelectedIndexChanged(object sender, EventArgs e)
    {

    }
  }
}
