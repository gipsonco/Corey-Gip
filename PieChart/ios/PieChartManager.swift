//
//  PieChartManager.swift
//  PieChart
//
//  Created by Mario Moreno on 3/28/22.
//

import Foundation

@objc(PieChartManager)
class PieChartManager: RCTViewManager {
  override func view() -> UIView! {
    return PieChartView(frame: .zero)
  }
}
