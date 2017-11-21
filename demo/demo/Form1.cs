using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace demo
{
  public partial class Form1 : Form
  {
    public Form1()
    {
      InitializeComponent();
    }

    private void ButtonClick(object sender, EventArgs e)
    {
      Program pg = new Program();
      button1.Visible = false;
      pg.GenerateReport(textBox1.Text, label2);
    }
  }
}
