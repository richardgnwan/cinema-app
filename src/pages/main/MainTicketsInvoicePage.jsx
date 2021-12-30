import React, { Fragment } from 'react'
import classes from './css/invoice.module.css';

const MainTicketsInvoicePage = () => {
  document.body.style = 'background: white;';
  return (
    <div>
      <button onClick={() => window.print()}>PRINT</button>
      <div className={classes.invoicebox}>
        <table cellPadding={0} cellSpacing={0}>
          <tbody><tr className={classes.top}>
            <td colSpan={2}>
              <table>
                <tbody><tr>
                  <td className={classes.title}>
                    <img src="https://www.sparksuite.com/images/logo.png" style={{ width: '100%', maxWidth: '300px' }} />
                  </td>
                  <td>
                    Invoice #: 123<br />
                    Created: January 1, 2015<br />
                    Due: February 1, 2015
                  </td>
                </tr>
                </tbody></table>
            </td>
          </tr>
            <tr className={classes.information}>
              <td colSpan={2}>
                <table>
                  <tbody><tr>
                    <td>
                      Cinema App, Inc.<br />
                    </td>
                    <td>
                      Acme Corp.<br />
                      Admin<br />
                      admin@example.com
                    </td>
                  </tr>
                  </tbody></table>
              </td>
            </tr>
            <tr className={classes.heading}>
              <td>Payment Method</td>
              <td>Check #</td>
            </tr>
            <tr>
              <td>Check</td>
              <td>1000</td>
            </tr>
            <tr className={classes.heading}>
              <td>Item</td>
              <td>Price</td>
            </tr>
            <tr className={classes.item}>
              <td>Website design</td>
              <td>$300.00</td>
            </tr>
            <tr className={classes.item}>
              <td>Hosting (3 months)</td>
              <td>$75.00</td>
            </tr>
            <tr className={classes.item}>
              <td>Domain name (1 year)</td>
              <td>$10.00</td>
            </tr>
            <tr className={classes.total}>
              <td />
              <td>Total: $385.00</td>
            </tr>
          </tbody></table>
      </div>
    </div>

  )
}

export default MainTicketsInvoicePage
