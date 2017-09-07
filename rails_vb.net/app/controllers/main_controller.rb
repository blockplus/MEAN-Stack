class MainController < ApplicationController
  protect_from_forgery except: :generate
  respond_to :json

  def index
  end

  def generate
    # post = Post.find(params[:id])
    # post.increment!(:upvotes)

    digits = params['digits']
    puts params['digits']

    q = []
    list = []

    # build sql query
    for i in 1..18
      #To Populate the UNT Base Unit
      if (1 == i)
        q[i] = "SELECT * FROM \"Base\" WHERE  \"Horsepower\" LIKE '%" + digits['hp'] + "%'  AND \"Oil\" LIKE '%" + digits['oil']+ "%'"
      end

      # To Populate Hydr Package
      if (2 == i)
          q[i] = "SELECT * FROM \"Hydr\" WHERE \"Pressure\" LIKE'%" + digits['pressure'] + "%'  AND \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"MotorVoltage\" LIKE '%" + digits['voltage']+ "%' AND \"Efficiency\" LIKE '%" + digits['efficiency'] + "%'";
      end

      # To Populate Frame Assy
      if (3 == i)
          q[i] = "SELECT * FROM \"Frame\" WHERE \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"Accumulator\" LIKE '%" + digits['accumulator'] + "%' AND \"ElecEnclosure\" LIKE '%" + digits['panel'] + "%' AND \"Doors\" LIKE '%" + digits['door'] + "%'";
      end

      # To Populate Kit Hi-Lo  Or Kit Prop
      if (4 == i)
        if (digits['propVlv'] == "0")
          q[i] = "SELECT * FROM \"HiLo\" WHERE  \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"PropVlve\" LIKE'%" + digits['propVlv'] + "%'AND \"PLC\" LIKE '%" + digits['plc'] + "%'"
        end

        if (digits['propVlv'] == "1")
          q[i] = "SELECT * FROM \"Prop\" WHERE \"Pressure\" LIKE'%" + digits['pressure'] + "%'  AND \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"PropVlve\" LIKE '%" + digits['propVlv'] + "%' AND \"PLC\" LIKE '%" + digits['plc'] + "%'"
        end
      end

      # To Populate Kit-Cooling
      if (5 == i) 
          q[i] = "SELECT * FROM \"Cooling\" WHERE \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"Cooling\" LIKE '%" +  digits['cooling'] + "%'";
      end

      # To populate Electrical
      if (6 == i)
          q[i] = "SELECT * FROM \"Elec\" WHERE \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"MotorVoltage\" LIKE '%" + digits['voltage'] + "%' AND \"Efficiency\" LIKE '%" + digits['efficiency'] + "%' AND \"Starter\" LIKE '%" + digits['starter'] + "%' AND \"ElecEnclosure\" LIKE '%" + digits['panel'] + "%'  AND \"PLC\" LIKE '%" + digits['plc'] + "%' "
      end

      #To populate Sound Insulation
      if (7 == i)
          q[i] = "SELECT * FROM \"DoorInsul\" WHERE \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"Doors\" LIKE '%" + digits['door'] + "%' AND \"ElecEnclosure\" LIKE '%" + digits['panel'] + "%'";
      end

      #To populate HP Assembly
      if (8 == i)
          q[i] = "SELECT * FROM \"HpAssy\" WHERE \"Pressure\" LIKE'%" + digits['pressure'] + "%'  AND \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"Accumulator\" LIKE '%" + digits['accumulator'] + "%' AND \"Efficiency\" LIKE '%" + digits['efficiency'] + "%'";
      end

      #To populate Seal-Hole or Redundant
      if (9 == i)

          if (digits['topworks'] == "S")
              q[i] = "SELECT * FROM \"Seal\" WHERE \"TopWorks\" LIKE'%" +  digits['topworks'] + "%' "
          end

          if (digits['topworks'] == "R")
                q[i] = "SELECT * FROM \"Rdt\" WHERE \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"TopWorks\" LIKE'%" + digits['topworks'] + "%' AND \"Efficiency\" LIKE '%" +  digits['efficiency'] + "%'  ";
          end
          
      end
      #To Populate Cover Assembly
      if (10 == i)
          q[i] = "SELECT * FROM \"CovAssy\" WHERE \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"TopCover\" LIKE '%" + digits['cover']  + "%' AND \"Cooling\" LIKE '%" + digits['cooling'] + "%'";
      end

      #To Populate Decals Kit
      if (11 == i)
          q[i] = "SELECT * FROM \"Decl\" WHERE \"Pressure\" LIKE'%" + digits['pressure']  + "%'  AND \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"Accumulator\" LIKE '%" + digits['accumulator'] + "%' AND \"Efficiency\" LIKE '%" + digits['efficiency'] + "%' AND \"Doors\" LIKE '%" + digits['door'] + "%' AND \"ElecEnclosure\" LIKE '%" + digits['panel'] + "%'";
      end

      #To Populate Test Report
      if (12 == i)
          q[i] = "SELECT * FROM \"TstRpt\" WHERE \"Pressure\" LIKE'%" + digits['pressure'] + "%'  AND \"Horsepower\" LIKE '%" + digits['hp'] + "%'";
      end

      #To Populate Maintenance Manual
      if (13 == i)
          q[i] = "SELECT * FROM \"MaintMnl\" WHERE \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"Efficiency\" LIKE '%" + digits['efficiency'] + "%'";
      end

      #To Populate Name Plate
      if (14 == i)
          q[i] = "SELECT * FROM \"NamePl\" WHERE  \"Certs\" LIKE '%" + digits['certs'] + "%'AND \"Efficiency\" LIKE '%" + digits['efficiency'] + "%'AND \"Starter\" LIKE '%" + digits['starter'] + "%'";
      end

      #To Populate Declar of Inc-CE
      if (15 == i)
          q[i] = "SELECT * FROM \"Inc\" WHERE \"Certs\" LIKE '%" + digits['certs'] + "%'";
      end

      #To Populate Declar of Conform-CE
      if (16 == i)
          q[i] = "SELECT * FROM \"Conform\" WHERE \"Certs\" LIKE '%" + digits['certs'] + "%'";
      end

      #To Populate Transducer
      if (17 == i)
          q[i] = "SELECT * FROM \"Tdcr\" WHERE \"Horsepower\" LIKE '%" + digits['hp'] + "%' AND \"Transducer\" LIKE '%" + digits['transducer'] + "%'";
      end

      #To Populate Power Factor
      if (18 == i)
          q[i] = "SELECT * FROM \"Pf\" WHERE \"Horsepower\" LIKE '%" + digits['hp'] + "%'AND \"MotorVoltage\" LIKE '%" + digits['voltage']  + "%' AND \"PFCorr\" LIKE '%" +  digits['pf'] + "%'"
      end
          

      # Execute DB Query
      if (q[i] != nil && q[i] != "")

        results = ActiveRecord::Base.connection.execute(q[i])

        results.each do |row|
          list.push(row)
        end

      end

    end

    render json: list.as_json
  end
end